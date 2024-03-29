import { Flex, HStack, Link, Text, useColorModeValue } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React from "react"
import ItemsView from "../components/itemsView"
import MLink from "../components/link"
import MSection from "../components/section"
import Layout from "../layouts"
import { purePath } from "../utils/helper"
import { useSiteMetadata } from "../utils/hooks"
import Tags from "../widgets/tags"

const PostList = ({ data, pageContext: { tag } }) => {
  const { basePathBlog } = useSiteMetadata()

  const _basePathBlog = basePathBlog || "/blog"

  const posts = data.allMdxPost.nodes

  return <Layout layout="default" title={`"${tag}"的文章`}>
    <MSection minH="calc(100vh - 20rem)" justifyContent="" textAlign="left"
      title={`博客文章: ${tag}`} description="写作是一种自我学习的方式">
      <HStack my="2rem" spacing="5" justifyContent="flex-end">
        {/* <MLink href="archives">查看归档</MLink> */}
        <MLink href="../../tags">全部标签</MLink>
      </HStack>
      <ItemsView type="tile" items={posts.map((item) => ({
        ...item,
        description: item.excerpt,
        href: purePath(`${_basePathBlog}/${item.slug}`),
      }))} subTitle={({ data: { tags }, ...props }) => (
        <Flex color={useColorModeValue("gray.400", "gray.700")} mt=".3rem">
          {/* <Text>{createdTime}</Text> */}
          <Tags simple items={tags.slice(0, 3)} />
        </Flex>
      )} trailing={({ data: { createdTime }, ...props}) => (
        <Flex display={["none", "none", "flex", "flex", "flex"]} ml="1rem" alignItems="center" w="fit-content" color={useColorModeValue("gray.400", "gray.700")}>
          <Text>{createdTime}</Text>
        </Flex>
      )} leading={({ data: {}, ...props}) => null}/>
    </MSection>
  </Layout>
}

export default PostList

// ($formatString: String!)
// (formatString: $formatString)
export const query = graphql`
  query ($formatString: String!, $tag: String!) {
    allMdxPost(
      sort: { fields: createdTime, order: DESC }
      filter: {tags: {elemMatch: {name: {eq: $tag}}}}
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