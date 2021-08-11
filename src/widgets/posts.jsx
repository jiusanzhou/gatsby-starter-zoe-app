import { Box, Center, Flex, Heading, Link, SimpleGrid, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import React from "react"
import ItemsView from "../components/itemsView"
import { useSiteMetadata } from "../utils/hooks"
import { purePath } from "../utils/helper"


const PostList = ({ items = [] }) => {
    const { basePathBlog } = useSiteMetadata()
    const _basePathBlog = basePathBlog || "/blog"

    return <ItemsView items={items.map((item) => ({
        ...item,
        href: purePath(`${_basePathBlog}/${item.slug}`),
        description: item.excerpt,
    }))} />
}

export default PostList