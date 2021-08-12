import { Flex, HStack, Link, Text, useColorModeValue } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React from "react"
import ItemsView from "../components/itemsView"
import MLink from "../components/link"
import MSection from "../components/section"
import Layout from "../layouts/default"
import { purePath } from "../utils/helper"
import { useSiteMetadata } from "../utils/hooks"
import Tags from "../widgets/tags"
import { default as PostsListWidget } from "../widgets/posts"

const PostList = ({ data, pageContext }) => {
  const { basePathBlog } = useSiteMetadata()
  const _basePathBlog = basePathBlog || "/blog"

  const posts = data.allMdxPost.nodes

  return <Layout layout="default" title="博客">
    {/* TODO: use BlogsList widget */}
    <MSection minH="calc(100vh - 20rem)" justifyContent="" textAlign="left"
      title="博客文章" description="写作是一种自我学习的方式">
      <HStack my="2rem" spacing="5" justifyContent="flex-end">
        {/* <MLink href="archives">查看归档</MLink> */}
        <MLink href="tags">全部标签</MLink>
      </HStack>
      <PostsListWidget items={posts} />
    </MSection>
  </Layout>
}

export default PostList

// ($formatString: String!)
// (formatString: $formatString)
export const query = graphql`
  query ($formatString: String!) {
    allMdxPost(
      sort: { fields: createdTime, order: DESC }
    ) {
      nodes {
        slug
        title
        createdTime(formatString: $formatString)
        modifiedTime(formatString: $formatString)
        excerpt
        timeToRead
        description
        tags {
          name
          slug
        }
      }
    }
  }
`