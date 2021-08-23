import { Flex, HStack, Link, Text, useColorModeValue } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React from "react"
import MLink from "../components/link"
import MSection from "../components/section"
import Layout from "../layouts"
import { default as PostsListWidget } from "../widgets/posts"

const PostList = ({ data, pageContext: { basePathBlog } }) => {

  const posts = data.allMdxPost.nodes

  return <Layout layout="default" title="博客">
    {/* TODO: use BlogsList widget */}
    <MSection minH="calc(100vh - 20rem)" justifyContent="" textAlign="left"
      title="博客文章" description={<Flex w="full" justifyContent="space-between">
        <Text>写作是一种自我学习的方式</Text>
        <HStack spacing="5" justifyContent="flex-end">
          <MLink href="archives">归档</MLink>
          <MLink href="tags">标签</MLink>
        </HStack>
      </Flex>}>
      <PostsListWidget mt="2rem" items={posts} />
    </MSection>
  </Layout>
}

export default PostList

// ($formatString: String!)
// (formatString: $formatString)
export const query = graphql`
  query ($formatString: String!) {
    allMdxPost(
      sort: { fields: [pinned, createdTime], order: [ASC, DESC] }
    ) {
      nodes {
        slug
        title
        createdTime(formatString: $formatString)
        modifiedTime(formatString: $formatString)
        excerpt
        timeToRead
        description
        pinned
        tags {
          name
          slug
        }
      }
    }
  }
`