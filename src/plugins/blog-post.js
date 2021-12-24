const kebabCase = require("lodash.kebabcase");
const path = require("path");
const { purePath } = require("../utils/helper");

const typeData = `
type PostTag {
    name: String!
    slug: String!
}

type MdxPost implements Node {
    id: ID!
    slug: String @mdxpassthrough(fieldName: "slug")
    title: String!
    createdTime: Date! @dateformat
    modifiedTime: Date! @dateformat
    excerpt(pruneLength: Int = 140, truncate: Boolean = true): String! @mdxpassthrough(fieldName: "excerpt")
    body: String! @mdxpassthrough(fieldName: "body")
    html: String! @mdxpassthrough(fieldName: "html")
    timeToRead: Int @mdxpassthrough(fieldName: "timeToRead")
    tags: [PostTag]
    banner: String
    description: String
    canonicalUrl: String
    published: Boolean
    pinned: Boolean
}`;

// banner: File @fileByRelativePath

const createPages = async (siteMetadata, { actions, graphql, reporter }) => {
    const {
        basePathBlog,
        blogListTemplate, blogPageTemplate,
        tagListTemplate, tagPageTemplate,
        archiveListTemplate, draftListTemplate,
        dateFormat,
    } = siteMetadata;

    const { createPage } = actions;

    let _basePathBlog = basePathBlog || "/blog"

    let _blogListTemplate = blogListTemplate || "./src/templates/post-list.jsx"
    let _blogPageTemplate = blogPageTemplate || "./src/templates/post-page.jsx"
    let _tagListTemplate = tagListTemplate || "./src/templates/tag-list.jsx"
    let _tagPageTemplate = tagPageTemplate || "./src/templates/tag-page.jsx"
    let _archiveListTemplate = archiveListTemplate || "./src/templates/post-archives.jsx"
    let _draftListTemplate = draftListTemplate || "./src/templates/post-draft.jsx"

    let _dateFormat = dateFormat || "MMMM DD, YYYY"

    // default blog list path is the blog root path
    let _blogListPath = _basePathBlog

    // if not ""(never) and /
    if (_basePathBlog && _basePathBlog !== "/") {
        // clean the last /
        if (_basePathBlog.endsWith("/")) _basePathBlog = _basePathBlog.slice(0, -1)

        // append s to the blog root path
        _blogListPath = _basePathBlog + "s" // /blogs
    }

    // create blog list page with paginate??
    createPage({
        path: _blogListPath, // TODO: paginate?
        component: path.resolve(_blogListTemplate),
        context: {
            basePathBlog: _basePathBlog,
            formatString: _dateFormat
            // TODO: paginate?
            // limit: 10,
            // skip: 0
        },
    })

    // create archives
    createPage({
        path: _blogListPath + "/archives",
        component: path.resolve(_archiveListTemplate),
        context: {
            basePathBlog: _basePathBlog,
            blogListPath: _blogListPath
        }
    })

    // create draft
    createPage({
        path: _blogListPath + "/drafts",
        component: path.resolve(_draftListTemplate),
        context: {
            basePathBlog: _basePathBlog,
            blogListPath: _blogListPath,
            title: "草稿"
        }
    })

    // create tags list
    createPage({
        path: _blogListPath + "/tags",
        component: path.resolve(_tagListTemplate),
        context: {
            blogListPath: _blogListPath
        }
    })

    // query all post and create blog post
    const result = await graphql(`
        query {
            allMdxPost(
                filter: {published: {eq: true}},
                sort: { fields: createdTime, order: DESC }
            ) {
                edges {
                    next {
                      slug
                      title
                    }
                    previous {
                      slug
                      title
                    }
                    node {
                      slug
                      title
                    }
                }
            }
            tags: allMdxPost(sort: { fields: tags___name, order: DESC }) {
                group(field: tags___name) {
                    fieldValue
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(`There was an error loading your posts or pages`, result.errors)
        return
    }

    // create each post blog
    const nodes = result.data.allMdxPost.edges
    nodes.forEach(({ node: { slug, title }, next, previous }) => {
        // create each post
        createPage({
            path: purePath(`${_basePathBlog}/${slug}`), // TODO: paginate?
            component: path.resolve(_blogPageTemplate),
            context: {
                formatString: _dateFormat,
                basePathBlog: _basePathBlog,
                slug, title,
                next, previous,
            },
        })
    })

    // create each tags filter page
    const tags = result.data.tags.group
    tags.forEach(({ fieldValue }) => {
        const tag = fieldValue
        // create each tag filter
        createPage({
            path: purePath(`${_blogListPath}/tag/${kebabCase(tag)}`),
            component: path.resolve(_tagPageTemplate),
            context: {
                formatString: _dateFormat,
                tag,
                // TODO: paginate?
                // limit: 10,
                // skip: 0
            },
        })
    })
}

// call in the sourceNodes to create nodes
// exports.sourceNode = sourceNode;

// register the types
exports.typeData = typeData;

exports.createPages = createPages;