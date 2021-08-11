import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Box, Flex, Heading, Link, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { graphql, useStaticQuery } from "gatsby"
import { Link as GatsbyLink } from "gatsby"

import React from "react"
import MLink from "../components/link"
import PostList from "../widgets/posts"

const PostsPreview = ({ preview = true, limit = 3, ...props }) => {

    const data = useStaticQuery(graphql`
query MdxPosts {
    allMdxPost(sort: { fields: createdTime, order: DESC }) {
        nodes {
            slug
            title
            createdTime
            modifiedTime
            excerpt
            timeToRead
            description
            tags {
            name
            slug
            }
        }
    }
}`)

    console.log("allMdxPost =====>", data)
    
    return <VStack spacing="10" mt={[10, 10]} {...props}>
        <PostList items={data.allMdxPost.nodes.slice(0, limit)} />
        <Flex w="100%" justifyContent="flex-end">
            <MLink href="/blogs">
                查看更多
            </MLink>
        </Flex>
    </VStack>
}

export default PostsPreview

// because we don't create the page, so export query doesn't work