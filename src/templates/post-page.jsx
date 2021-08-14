import { ArrowBackIcon, EditIcon, TimeIcon } from "@chakra-ui/icons"
import { Box, Divider, Flex, HStack, Text } from "@chakra-ui/react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import MLink from "../components/link"
import MSection from "../components/section"
import Layout from "../layouts"
import AuthorCard from "../views/author-card"
import Comments from "../views/comments"
import Tags from "../widgets/tags"

const PostPage = ({ data }) => {
    const { title, body, tags, createdTime, timeToRead } = data.mdxPost
    console.log(data.mdxPost)
    return <Layout layout="default" fixed={false} title={title}>
        <MSection
        subTitleProps={{textAlign: "left"}}
        subTitle={<MLink pure display="inline-flex" alignItems="center" href="/blogs" fontSize=".875rem">
          {/* TODO: useLinks get blogs list path */}
          <ArrowBackIcon mr="2" /> Back to Blog
        </MLink>}
        title={title}
        minH="calc(100vh - 20rem)">
            <HStack spacing="5" mb="1rem" alignItems="center">
              {/*  marginLeft="auto" */}
                <AuthorCard simple />
                <Text fontSize=".875rem">
                    <EditIcon mr=".5rem" />{createdTime}</Text>
                <Text fontSize=".875rem">
                    <TimeIcon mr=".5rem" />{timeToRead} MINS</Text>
                
            </HStack>

            <Box textAlign="left">
                <MDXRenderer>{[body]}</MDXRenderer>
            </Box>

            <Flex mt="2rem">
                <Tags items={tags} />
            </Flex>
            <Divider my="2rem" />
            <Comments />
        </MSection>
    </Layout>
}

export default PostPage

export const query = graphql`
query ($slug: String!, $formatString: String!) {
    mdxPost(slug: { eq: $slug }) {
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
        body
        banner
    }
  }
`

/**
 *  {
          childImageSharp {
            resize(width: 1200, quality: 90) {
              src
            }
          }
        }
 */