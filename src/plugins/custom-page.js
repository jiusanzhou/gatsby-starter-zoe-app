const path = require("path");
const kebabCase = require(`lodash.kebabcase`);
const { purePath } = require("../utils/helper");

// create nodes from mdx
// remove to another plugin

const onCreateNode = ({ customNodes = [], baseContentDir = [] }, { node, actions, getNode, createNodeId, createContentDigest }) => {
    const { createNode, createParentChildLink } = actions;

    // at most time we are a child of file type
    const fileNode = getNode(node.parent);
    if (!fileNode) return;

    const source = fileNode.sourceInstanceName;
    // let dir = fileNode.dir;
    // if (!dir) return;

    // remove baseContentDir of dir
    // must have / prefix
    // sort with length to handle correct with child-parent.
    // baseContentDir.sort((a, b) => b.length - a.length).forEach((d) => {
    //     dir = dir.replace(d, "");
    // })

    let m;
    // filter if we need to create another node
    for (let i = 0; i < customNodes.length; i++) {
        let { name, when: {type, sourceName, path} = {} } = customNodes[i];
        if (node.internal.type === type && source === name) {
            m = customNodes[i];
            break;

            // this code are deprecated, which be replaced by zoefile parser
            // register a custom source name
        }
    }

    if (!m) return;

    // TODO: code bellow should config with zoefile: transformer

    const { name } = m;

    // - theme
    // - layout
    const fieldData = { ...node.frontmatter };

    // hard code for tags
    if (fieldData.tags) fieldData.tags = fieldData.tags.map(tag => ({
        name: tag, slug: kebabCase(tag),
    }));

    // hard code for time
    if (!fieldData.modifiedTime) fieldData.modifiedTime = fileNode.modifiedTime;
    
    if (!fieldData.createdTime) fieldData.createdTime = fieldData.date;
    if (!fieldData.createdTime) fieldData.createdTime = fileNode.birthTime;

    let pureName = fileNode.relativePath.replace(fileNode.ext, "");
    // TODO: hard code for slug as default: file name?
    // remove ext and ...
    if (!fieldData.slug) fieldData.slug = pureName;
    
    // TODO: hard code for default title, file name
    if (!fieldData.title) fieldData.title = pureName;

    // hard code for layout
    if (!fieldData.layout) fieldData.layout = "default";

    // TODO: auto set first image for banner(hard code)

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
    const { staticPageTemplate, customPageTemplate } = siteMetadata;

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
        const _path = purePath(`/${page.slug}`)

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