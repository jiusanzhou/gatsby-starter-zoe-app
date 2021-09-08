/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");
const kebabCase = require(`lodash.kebabcase`);

const { loadZoefile } = require("./src/utils/zoefile");
const { pageWrapHelper } = require("./src/utils/wraper");
const { mdxResolverPassthrough, purePath } = require("./src/utils/helper");

// load siteMetadata from zoefile
const { siteMetadata } = loadZoefile();

// TODO: auto search in src and
// const plugins = [
//     "src/plugins/app-release",
//     "src/plugins/remote-image",
//     "src/plugins/static-page", // must before custom page
//     "src/plugins/custom-page",
//     "src/plugins/repo-project",
//     "src/plugins/blog-post",
//     "src/plugins/issue-helpqa",
// ];

// from zoe-site.yaml
const plugins = siteMetadata.zoePlugins || [];

// This is a shortcut so MDX can import components without gross relative paths.
// Example: import { Image } from '$components';
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
    if (getConfig().mode === 'production') {
      actions.setWebpackConfig({
        devtool: false
      });
    }
    
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, "src"), "node_modules"],
            alias: { $: path.resolve(__dirname, "src") },
            fallback: {
              path: require.resolve('path-browserify'),
            },
        },
    });
};

// Create general interfaces that you could can use to leverage other data sources
// The core theme sets up MDX as a type for the general interface
exports.createSchemaCustomization = ({ actions, schema }, themeOptions = {}) => {
  const { createTypes, createFieldExtension } = actions;

  const { pathPrefix = "/" } = siteMetadata;

  const slugify = (source) => {
    const slug = source.slug || kebabCase(source.title);
    return purePath(`/${pathPrefix}/${slug}`)
  }

  createFieldExtension({
    name: `slugify`,
    extend() {
      return {
        resolve: slugify,
      }
    },
  });

  createFieldExtension({
      name: `mdxpassthrough`,
      args: {
        fieldName: `String!`,
      },
      extend({ fieldName }) {
          return {
              resolve: mdxResolverPassthrough(fieldName),
          }
      }
  });

  // ok let's create the types
  createTypes(plugins.map((e) => {
    let td = require(path.resolve(__dirname, e)).typeData;
    switch (typeof td) {
      case 'string': return td;
      case 'function': return td(siteMetadata);
    }
    return;
  }).filter((i) => i).join(`
  
  `));
}

// ======== create node source ======

// import nodes to create, how to create multi
exports.sourceNodes = async (opts) => {
    const { actions, createContentDigest } = opts
    // loads all nodes we need to create
    await Promise.all(
        plugins.map(async (e) => {
            const c = require(path.resolve(__dirname, e)).sourceNode;
            if (!c) return;

            // just call the function
            if (typeof c === "function") return c(siteMetadata, opts);

            // if c is array
            let sources = [];
            if (Array.isArray(c)) {
              sources.push(...c);
            } else if (typeof c === "object") {
              sources.push(c);
            }

            await Promise.all(sources.map(async (c) => {
              // name, and data
              if (!c.createData) return;
              const data = c.createData(siteMetadata);
              const res = typeof data.then !== "function" ? data : await data;
  
              // TODO: check is res is a array
              if (!Array.isArray(res)) return;
  
              res.forEach((v) => {
                  // create release node
                  actions.createNode({
                      ...v,
                      id: v.id || "" + Date.now(), // TODO: use a rela id
                      internal: {
                          type: c.name,
                          contentDigest: createContentDigest(v),
                          content: JSON.stringify(v),
                          mediaType: c.mediaType || "application/json",
                      },
                  });
              });
            }));
        })
    );
};

// on the create node
// - turn a mdx node to post or page
// - parse remote images from a mdx node
exports.onCreateNode = async (params, themeOptions) => {
  await Promise.all(
    plugins.map(async (e) => {
      const c = require(path.resolve(__dirname, e)).onCreateNode;
      switch (typeof c) {
        case 'function': return c(siteMetadata, params);
      }
    })
  );
};

// create pages
exports.createPages = async (params, themeOptions) => {
  await Promise.all(
    plugins.map(async (e) => {
      const c = require(path.resolve(__dirname, e)).createPages;
      if (!c) return;
      switch (typeof c) {
        case 'function': return c(siteMetadata, params);
      }
    })
  )
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
