/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const crypto = require("crypto");
const path = require("path");
const template = require("lodash.template");
const { loadZoefile } = require("./src/utils/zoefile");

// This is a shortcut so MDX can import components without gross relative paths.
// Example: import { Image } from '$components';
exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, "src"), "node_modules"],
            alias: { $: path.resolve(__dirname, "src") },
        },
    });
};

// ======== createe node ======
// TODO: auto search in src and find module.createNode
const _needCreateNodes = ["src/helper/app-release", "src/helper/remote-image"];

// import nodes to create, how to create multi
exports.sourceNodes = async ({ actions }) => {
    // get siteMeta data
    // create node

    // load siteMetadata from zoefile
    const { siteMetadata } = loadZoefile();

    // loads all nodes we need to create
    await Promise.all(
        _needCreateNodes.map(async (e) => {
            const c = require(path.resolve(__dirname, e)).createNode;
            if (!c) return;

            // just call the function
            if (typeof c === "function") return c(actions);

            // name, and data
            if (!c.createData) return;
            const data = c.createData(siteMetadata);
            const res = typeof data.then !== "function" ? data : await data;

            // TODO: check is res is a array
            if (Array.isArray(res))
                res.forEach((v) => {
                    // create release node
                    actions.createNode({
                        ...v,
                        id: v.id || "" + Date.now(), // TODO: use a rela id
                        internal: {
                            type: c.name,
                            contentDigest: crypto
                                .createHash(`md5`)
                                .update(JSON.stringify(v))
                                .digest(`hex`),
                            mediaType: c.mediaType || "application/json",
                        },
                    });
                });
        })
    );
};
