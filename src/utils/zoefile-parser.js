// const { loadObject, isConfig } = require("./config");

// for global access
const _global = {
    zoe: {}, // must set will parse
};

const _systemKeys = {
    siteMetadata: null,
    plugins: {
        type: Object,
        keys: ["plugins"],
    },
    pathPrefix: {
        type: String,
        keys: ["prefix", "pathPrefix"],
    },
    polyfill: {
        type: Boolean,
        keys: ["polyfill"],
    },
    mapping: {
        type: Object,
        keys: ["mapping"],
    },
    flags: {
        type: Object,
        keys: ["flags"],
    },
    proxy: {
        type: Object,
        keys: ["proxy"],
    },
};

const _sysKeysMap = () => {
    let keys = _systemKeys;
    const _keys = {};
    Object.keys(keys).forEach((key) => {
        keys[key] &&
            keys[key].keys.forEach((k) => {
                _keys[k] = key;
            });
    });
    return _keys;
};

const _eval = (s) => {
    const __dirname = _global.__dirname
    const zoe = _global.zoe
    // ignore the lint
    if (__dirname === zoe) {}
    return eval(s)
}

const _genVal = (s) => {
    if (!s) return s;
    let typ = typeof s;
    switch (typ) {
        case "object":
            if (s instanceof Array) {
                return s.map((i) => _genVal(i));
            } else {
                let d = {};
                Object.keys(s).map((i) => (d[i] = _genVal(s[i])));
                return d;
            }
        case "string":
            // TODO: improve, check if we have ${}
            // a${a} ${a}a ${a}
            let v;
            const _st = s.indexOf("${");
            if (_st < 0) {
                v = s
            } else if (_st === 0 && s.slice(-1) === "}") {
                // ${a} who to access global
                return _eval(s.slice(2, -1));
            } else {
                // a${a} ${a}a a${a}a
                return _eval("`" + s + "`");
            }

            if (s.indexOf("=>") >= 2) {
                try {
                    v = eval(s)
                } catch(e) {
                    v = s
                }
            }

            // // @a.json, @a.yaml, @a.toml
            // if (v.indexOf("@") === 0 && isConfig(v.slice(1))) {
            //     v = loadObject(v.slice(1));
            // }

            // TODO: load value hooks
            return v;
        default:
            return s;
    }
};

const buildPlugin = (plg) => {
    let typ = typeof plg;
    switch (typ) {
        case "string":
            // return string directly
            // if we have => , maybe we are a function define
            return plg
        case "object":
            // build plugin with layout
            let name = Object.keys(plg)[0];
            let opts = _genVal(plg[name]);

            // Plugins plugins
            Object.keys(opts).forEach(key => {
                if (key === "plugins" || key.endsWith("Plugins")) {
                    opts[key] = opts[key].map((i) => buildPlugin(i))
                }
            });

            return {
                resolve: name,
                options: opts,
            };
            // if options.plugins
            // then build plugin for too
        default:
            // return plg???
            return plg;
    }
};

const buildConfig = (zoe) => {
    // set to global!!!
    _global.zoe = zoe;

    const config = {};

    const siteMetadata = {};

    // generate system keys
    let syskeys = _sysKeysMap();

    const keys = Object.keys(zoe);

    keys.forEach((k) => {
        // build plugins, make sure zoe[k] is a array
        if (k === "plugins" && zoe[k]) {
            // build plugin first
            config.plugins = zoe[k].map((i) => buildPlugin(i)).filter((i) => i);
            // wont set plugin in siteMeta
            return;
        }

        const v = _genVal(zoe[k])

        // if key in syskeys, set to config
        if (syskeys[k]) config[syskeys[k]] = v;

        // add all keys to siteMeta
        siteMetadata[k] = v;
    });

    config.siteMetadata = siteMetadata;

    return config;
};

exports.buildZoefile = (data, props = {}) => {
    Object.keys(props).forEach((k) => (_global[k] = props[k]));
    return buildConfig(data);
};
