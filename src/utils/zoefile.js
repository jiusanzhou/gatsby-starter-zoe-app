const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const { buildZoefile } = require("./zoefile-parser");

// TODO: parse remote images and use gatsby-plugin-remote-images

exports.loadZoefile = (zoefile = `${__dirname}/zoe-site.yaml`) => {
    // set global: make sure first call zoefile is root of this project
    __dirname = path.dirname(zoefile); // correct????
    // load zoe configuration from file
    const zoe = yaml.safeLoad(fs.readFileSync(zoefile, "utf8"));
    return buildZoefile(zoe, { __dirname });
};
