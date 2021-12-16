import { Box, Flex, Heading, HStack, Link, Tag, Text, useColorModeValue } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React from "react"
import ItemsView from "../components/itemsView"
import MSection from "../components/section"
import Layout from "../layouts"
import { purePath } from "../utils/helper"

const PostList = ({ data, pageContext: { basePathBlog } }) => {

  const posts = data.allMdxPost.nodes

  // generate group by year or year-month
  let years = {}
  posts.forEach((post) => {
    let y = post.createdTime.split("-")[0]
    if (!years[y]) years[y] = []
    years[y].push(post)
  })

  return <Layout layout="default" title="博客">
    {/* TODO: use BlogsList widget */}
    <MSection minH="calc(100vh - 20rem)" justifyContent="" textAlign="left"
      title="文章归档" description={`共 ${posts.length} 篇文章`}>
      {/* <HStack my="2rem" spacing="5" justifyContent="flex-end">
        <MLink href="tags">全部标签</MLink>
      </HStack> */}
      {Object.keys(years).sort((a, b) => b - a).map((y, index) => (
      <Box mt="2rem">
        <Heading pb="3" borderBottomWidth="1px"
          as="h3" fontSize="1.5rem">{y}</Heading>
        <Box mt="2rem">
          <ItemsView type="tile" items={years[y].map((item) => ({
            ...item,
            description: item.description || item.excerpt,
            href: purePath(`${basePathBlog}/${item.slug}`),
          }))}
          titleProps={{fontWeight: 'semibold'}}
          containerProps={{h: null}} spacing="5"
          trailing={({ data: { createdTime }, ...props}) => (
            <Flex display={["none", "none", "flex", "flex", "flex"]}
              ml="1rem" alignItems="center" w="fit-content"
              color={useColorModeValue("gray.400", "gray.700")}>
                <Text>{createdTime.split("T")[0]}</Text>
            </Flex>)}
          leading={({ data: { published } })=>
            published?
            null:
            <Tag size="sm" colorScheme="red" mr="1rem">DRAFT</Tag>
          }
          description={()=>null} />
        </Box>
      </Box>))}
    </MSection>
  </Layout>
}

export default PostList

// ($formatString: String!)
// (formatString: $formatString)
// filter: {published: {eq: true}},
export const query = graphql`
  query {
    allMdxPost(
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