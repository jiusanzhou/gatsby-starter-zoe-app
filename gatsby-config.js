require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

// install global proxy
const { bootstrap } = require("global-agent")
bootstrap()

const yaml = require("js-yaml");
const fs = require("fs");

// define zoe configuration file.
const zoefile = `${__dirname}/zoe-site.yaml`;

// for global access
var zoe = {};

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
  proxy: {
    type: Object,
    keys: ["mapping"],
  },
};

const _sysKeysMap = () => {
  let keys = _systemKeys;
  const _keys = {};
  Object.keys(keys).map((key) => {
    keys[key] &&
      keys[key].keys.map((k) => {
        _keys[k] = key;
      });
  });
  return _keys;
};

const _genVal = (s) => {
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
      // check if we have ${} TODO: improve
      return s.indexOf("${") < 0 ? s : eval("`" + s + "`");
    default:
      return s;
  }
};

const buildPlugin = (plg) => {
  let typ = typeof plg;
  switch (typ) {
    case "string":
      // return string directly
      return plg;
    case "object":
      // build plugin with layout
      let name = Object.keys(plg)[0];
      return {
        resolve: name,
        options: _genVal(plg[name]),
      };
    default:
      return null;
  }
};

const buildConfig = (zoefile) => {
  const config = {};

  const siteMetadata = {};

  // load zoe configuration from file
  zoe = yaml.safeLoad(fs.readFileSync(zoefile, "utf8"));

  // generate system keys
  let syskeys = _sysKeysMap();

  const keys = Object.keys(zoe);

  keys.map((k) => {
    // build plugins
    if (k === "plugins" && zoe[k]) {
      config.plugins = zoe[k].map((i) => buildPlugin(i)).filter((i) => i);
      return;
    }

    // if key in syskeys, set to config
    if (syskeys[k]) {
      config[syskeys[k]] = zoe[k];
    }

    // add all keys to siteMeta
    siteMetadata[k] = zoe[k];
  });

  config.siteMetadata = siteMetadata;

  return config;
};

module.exports = {
  // add extend config at here like, developMiddleware
  ...buildConfig(zoefile),
};
