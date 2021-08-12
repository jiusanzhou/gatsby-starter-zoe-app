import { EditIcon, TimeIcon } from "@chakra-ui/icons"
import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import MLink from "../components/link"
import MSection from "../components/section"
import Layout from "../layouts"
import AuthorCard from "../views/author-card"
import Tags from "../widgets/tags"

const PostPage = ({ data }) => {
    const { title, body, tags, createdTime, timeToRead } = data.mdxPost
    console.log(data.mdxPost)
    return <Layout layout="default" fixed={false} title={title}>
        <MSection
        subTitleProps={{textAlign: "left"}}
        subTitle={<MLink pure href="/blogs" fontSize=".875rem">
          {/* TODO: useLinks get blogs list path */}
          ← Back to Blog
        </MLink>}
        title={title}
        minH="calc(100vh - 20rem)">
            <Flex mb="1rem" alignItems="center">    
                <Text mr="2rem">
                    <EditIcon mr=".5rem" />{createdTime}</Text>
                <Text>
                    <TimeIcon mr=".5rem" />{timeToRead} MINS</Text>
                
                <AuthorCard marginLeft="auto" simple />
            </Flex>

            <Box textAlign="left">
                <MDXRenderer>{[body]}</MDXRenderer>
            </Box>

            <Flex mt="4rem">
                <Tags items={tags} />
            </Flex>
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
        banner {
          childImageSharp {
            resize(width: 1200, quality: 90) {
              src
            }
          }
        }
    }
  }
`