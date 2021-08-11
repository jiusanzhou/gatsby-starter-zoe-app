
const path = require("path");
const { loadObject, isConfig } = require("../utils/config");

const createPages = (siteMetadata, { actions }) => {
    // load siteMetadata from zoefile, create static pages
    const { pages = {}, pageTemplate } = siteMetadata;

    // create pages from metadata, if we can found component page, set as a layout
    Object.keys(pages).forEach((key) => {
        // set p as a path, but how to set page like a template
        // in some case, we define a page layout which can generate
        // multi pages by data.
        let page = pages[key];
        
        if (isConfig(page)) page = loadObject(page);

        let _path = key;

        // TODO: is not conponent
        _path = page.path || key;

        let pagetpl = pageTemplate || './src/components/_page.jsx';

        // create page from pageProps
        // we need to modify the page with pageWrapper
        actions.createPage({
            path: _path,
            component: path.resolve(pagetpl),
            context: { key, page }
            // pageWrapper: pageWrapHelper(siteMetadata.pageWrappers, _path)
        });

        // TODO: don't create page directly here.
        // just create mdxPage node
    });
}

// create node first???

const typeData = `
    type StaticPage implements Node @dontInfer {
        slug: String!
        layout: String
        title: String
    }
`;


exports.createPages = createPages;

exports.typeData = typeData;