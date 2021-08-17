const path = require("path");
const kebabCase = require(`lodash.kebabcase`);
const { purePath } = require("../utils/helper");

// create nodes from mdx

const onCreateNode = ({ customNodes = [] }, { node, actions, getNode, createNodeId, createContentDigest }) => {
    const { createNode, createParentChildLink } = actions;
    let m;

    // at most time we are a child of file type
    const fileNode = getNode(node.parent);
    if (!fileNode) return;

    const source = fileNode.sourceInstanceName;

    // filter if we need to create another node
    for (let i = 0; i < customNodes.length; i++) {
        let { type, name } = customNodes[i].when || {};
        if (node.internal.type === type && source === name) {
            m = customNodes[i];
        }
    }

    if (!m) return;

    const { name } = m;

    // - theme
    // - layout
    const fieldData = { ...node.frontmatter };

    // death code for tags
    if (fieldData.tags) fieldData.tags = fieldData.tags.map(tag => ({
        name: tag, slug: kebabCase(tag),
    }));

    // death code for time
    if (!fieldData.modifiedTime) fieldData.modifiedTime = fileNode.modifiedTime;
    if (!fieldData.createdTime) fieldData.createdTime = fileNode.birthTime;

    // death code for layout
    if (!fieldData.layout) fieldData.layout = "default";

    const rid = createNodeId(`${node.id}@${name}`);

    createNode({
        ...fieldData,
        id: rid,
        parent: node.id,
        children: [],
        internal: {
            type: name,
            contentDigest: createContentDigest(fieldData),
            content: JSON.stringify(fieldData),
        },
    });

    createParentChildLink({ parent: node, child: getNode(rid) })
};

const typeData = `
type MdxPage implements Node {
    slug: String! @mdxpassthrough(fieldName: "slug")
    title: String!
    layout: String
    container: String
    excerpt(pruneLength: Int = 140, truncate: Boolean = true): String! @mdxpassthrough(fieldName: "excerpt")
    body: String! @mdxpassthrough(fieldName: "body")
    createdTime: Date! @dateformat
    modifiedTime: Date! @dateformat
}
`;

const createPages = async (siteMetadata, { actions, graphql, reporter }) => {
    const { basePath, staticPageTemplate, customPageTemplate } = siteMetadata;

    const { createPage } = actions;

    // create custom pages, like
    // home ???
    // posts ???
    // archive ???
    // tags ???

    const _staticPageTemplate = staticPageTemplate || './src/components/_page.jsx';
    const _customPageTemplate = customPageTemplate || './src/templates/page.jsx';

    const result = await graphql(`
        query {
            allMdxPage {
                nodes {
                    slug
                    layout
                    container
                    title
                    body
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(`There was an error loading your posts or pages`, result.errors)
        return
    }

    // create pages from MdxPage
    const pages = result.data.allMdxPage.nodes
    pages.forEach((page) => {
        const _path = purePath(`/${basePath}/${page.slug}`)

        // create page use page query and custom page template
        createPage({
            path: _path,
            component: path.resolve(_customPageTemplate),
            context: {
                slug: page.slug,
            }
        })
                
        // create page directlly use static page component
        // createPage({
        //     path: _path,
        //     component: path.resolve(pagetpl),
        //     context: {
        //         page: {
        //             layout: page.layout,
        //             title: page.title,
        //             children: {
        //                 type: page.container || "MSection",
        //                 // TODO: use props from page.containerProps
        //                 minH: "calc(100vh - 20rem)",
        //                 textAlign: "left",
        //                 children: {
        //                     type: "MDXRenderer",
        //                     children: [ page.body ]
        //                 }
        //             }
        //         }
        //     },
        // })
    });

    // create posts from MdxPost
    // TODO: create posts from MdxPost
}

// call in the onCreateNode to turn a node to another
exports.onCreateNode = onCreateNode;

// call in the sourceNodes to create nodes
// exports.sourceNode = sourceNode;

// register the types
exports.typeData = typeData;

exports.createPages = createPages;