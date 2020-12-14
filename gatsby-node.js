/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const crypto = require("crypto");
const path = require("path");
const template = require("lodash.template");
const { loadZoefile } = require("./src/utils/zoefile");
const { pageWrapHelper } = require("./src/helper/page-wrapper");

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

// ======== create node source ======
// TODO: auto search in src and find module.createNode
const _needCreateNodes = ["src/helper/app-release", "src/helper/remote-image"];

// load siteMetadata from zoefile
const { siteMetadata } = loadZoefile();

// import nodes to create, how to create multi
exports.sourceNodes = async ({ actions }) => {
    // get siteMeta data
    // create node

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

// on the create node
// no need at this time
exports.onCreateNode = ({ node }) => {};

// create pages
exports.createPages = async ({ actions }) => {
    // load siteMetadata from zoefile
    const { pages = {} } = siteMetadata;

    // create pages from metadata, if we can found component page, set as a layout
    Object.keys(pages).forEach((key) => {
        // set p as a path, but how to set page like a template
        // in some case, we define a page layout which can generate
        // multi pages by data.
        const page = pages[key];
        const _path = page.path || key;

        // create page from pageProps
        // we need to modify the page with pageWrapper
        actions.createPage({
            path: _path,
            component: path.resolve('./src/components/_page.jsx'),
            context: {
                key,
                page,
                pageWrapper: pageWrapHelper(siteMetadata.pageWrappers, _path)
            }
        });
    });
};

// add more options or data to page
exports.onCreatePage = ({ page, actions }) => {
    let c = pageWrapHelper(siteMetadata.pageWrappers, page.path)
    if (!c) return;
    actions.deletePage(page)
    actions.createPage({
        ...page,
        context: {
            ...page.context,
            pageWrapper: c,
        }
    })
}
