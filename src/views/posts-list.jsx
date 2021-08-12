import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import {default as PostListWidget} from "../widgets/posts"

const PostsList = ({ preview = true, limit = 3, ...props }) => {

    const data = useStaticQuery(graphql`
query MdxPosts {
    allMdxPost(sort: { fields: createdTime, order: DESC }) {
        nodes {
            slug
            title
            createdTime
            modifiedTime
            excerpt(pruneLength: 80)
            timeToRead
            description
            tags {
                name
                slug
            }
        }
    }
}`)
    
    return <PostListWidget preview={preview} mt="10" {...props}
        items={data.allMdxPost.nodes.slice(0, limit)} />
}

export default PostsList

// because we don't create the page, so export query doesn't work