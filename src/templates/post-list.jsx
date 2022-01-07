import { Flex, HStack, Link, Text, useColorModeValue } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React from "react"
import MLink from "../components/link"
import MSection from "../components/section"
import Layout from "../layouts"
import { default as PostsListWidget } from "../widgets/posts"

const PostList = ({ data, pageContext: {
  basePathBlog,
  title,
  description,
} }) => {

  const posts = data.allMdxPost.nodes

  return <Layout layout="default" title="博客">
    {/* TODO: use BlogsList widget */}
    <MSection minH="calc(100vh - 20rem)" justifyContent="" textAlign="left"
      title={title||"文章"} description={<Flex w="full" justifyContent="space-between">
        <Text>{description}</Text>
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
// only published
export const query = graphql`
  query ($formatString: String!) {
    allMdxPost(
      filter: {published: {eq: true}},
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