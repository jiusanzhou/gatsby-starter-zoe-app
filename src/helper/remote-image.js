const isImageUrl = (url, patterns = []) => {
    // if we don't contains can't be a remote url
    if (url.indexOf("://") < 0) return false;

    for (let i in patterns) {
        // yeah found it!
        if (new RegExp(patterns[i]).test(url)) return true;
    }
    return false;
};

const parseImageUrl = (obj, res = [], patterns = []) => {
    if (!obj) return;
    let t = typeof obj;
    switch (t) {
        case "string":
            isImageUrl(obj, patterns) && res.push(obj);
            break;
        case "object":
            (Array.isArray(obj)
                ? obj
                : Object.keys(obj).map((e) => obj[e])
            ).forEach((e) => parseImageUrl(e, res, patterns));
            break;
        default:
        // do nothing
    }
};

const createNode = {
    name: "RemoteImage", // just for static in siteMeta
    mediaType: "appplication/json",
    // how to provider the data: []
    data: [],
    createData: ({ remoteImageUrlPatterns, ...siteMeta }) => {
        // TODO: view each value and parse the url of images
        let res = [];
        parseImageUrl(siteMeta, res, remoteImageUrlPatterns);
        // create nodes contains images [{url: ''}]
        // can we auto add plugins config
        // how can we distingh a normal url and image url?
        return res.map((e) => ({ url: e }));
    },
};

exports.createNode = createNode;
