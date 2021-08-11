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

const typeData = `
    type RemoteImage implements Node {
        url: String!
    }`;

const sourceNode = {
    name: "RemoteImage", // just for static in siteMeta
    mediaType: "appplication/json",
    // how to provider the data: []
    data: [],
    createData: ({ remoteImageUrlPatterns, ...siteMeta }) => {
        // TODO: view each value and parse the url of images
        // we must push a example image must to generate a image schema
        let res = [
            // "https://avatars2.githubusercontent.com/u/62942163?s=200&v=4",
            // "https://via.placeholder.com/640x480/09f.png/fff"
        ];

        parseImageUrl(siteMeta, res, remoteImageUrlPatterns);
        // create nodes contains images [{url: ''}]
        // can we auto add plugins config
        // how can we distingh a normal url and image url?
        return res.map((e) => ({ url: e }));
    },
};

const onCreateNode = ({ remoteImageNodes = [] }, { node, actions, getNode, createNodeId, createContentDigest }) => {
    const { createNode, createParentChildLink } = actions;

    remoteImageNodes.forEach(({ type, field, patterns = []}) => {
        if (type !== node.internal.type) {
            return;
        }

        // ok let build the remote images
        // get content with fiel from node
        let content = node[field];

        // field content must be string
        if (typeof content !== 'string') {
            return;
        }

        patterns.forEach(pattern => {
            // use pattern to exec the content
            [...content.matchAll((new RegExp(pattern, "g")))].forEach((v) => {
                // pattern must with group, so v.length should > 2
                if (v.length < 2) return;

                // create the remote image
                let url = v[1];

                // what if if the local image???
                if (!url.startsWith('http')) return;

                const rid = createNodeId(`${url}`);

                createNode({
                    url,

                    id: rid,
                    parent: node.id,
                    children: [],
                    internal: {
                        type: "RemoteImage",
                        contentDigest: createContentDigest(url),
                        content: url,
                    },
                });

                createParentChildLink({ parent: node, child: getNode(rid) })
            });

        });
    })
}

// register the types
exports.typeData = typeData;

exports.sourceNode = sourceNode;

// call in the onCreateNode to turn a node to another
exports.onCreateNode = onCreateNode;