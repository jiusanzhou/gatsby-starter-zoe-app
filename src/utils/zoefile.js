const path = require("path");
const { loadObject } = require("./config");
const { buildZoefile } = require("./zoefile-parser");

// TODO: parse remote images and use gatsby-plugin-remote-images

exports.loadZoefile = (zoefile = `${__dirname}/zoe-site.yaml`) => {
    // set global: make sure first call zoefile is root of this project
    __dirname = path.dirname(zoefile); // correct????
    // load zoe configuration from file
    const zoe = loadObject(zoefile);
    return buildZoefile(zoe, { __dirname });
};
