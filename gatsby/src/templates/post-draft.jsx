import { graphql } from "gatsby"
import React from "react"
import PostArchives from './post-archives'

export default PostArchives

export const query = graphql`
  query {
    allMdxPost(
      filter: {published: {ne: true}},
      sort: { fields: createdTime, order: DESC }
    ) {
      nodes {
        slug
        title
        createdTime
        modifiedTime
        excerpt
        timeToRead
        description
        published
        tags {
          name
          slug
        }
      }
    }
  }
`