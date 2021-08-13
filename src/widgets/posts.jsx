import { Box, Center, Flex, Heading, Link, SimpleGrid, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import React from "react"
import ItemsView from "../components/itemsView"
import { useSiteMetadata } from "../utils/hooks"
import { purePath } from "../utils/helper"
import MLink from "../components/link"
import Tags from "./tags"
import { ArrowForwardIcon } from "@chakra-ui/icons"


const PostList = ({ items = [], preview, ...props }) => {
    const { basePathBlog } = useSiteMetadata()
    const _basePathBlog = basePathBlog || "/blog"
    const _blogListPath = _basePathBlog === "/" ? "/" : _basePathBlog + "s"

    const itemProps = {}
    if (!preview) itemProps.subTitle = ({ data: { tags }, ...props }) => (
        <Flex color={useColorModeValue("gray.400", "gray.700")} mt=".3rem">
            {/* <Text>{createdTime}</Text> */}
            <Tags simple items={tags.slice(0, 3)} />
        </Flex>)

    if (!preview) itemProps.trailing = ({ data: { createdTime }, ...props}) => (
        <Flex display={["none", "none", "flex", "flex", "flex"]} ml="1rem" alignItems="center" w="fit-content" color={useColorModeValue("gray.400", "gray.700")}>
            <Text>{createdTime}</Text>
        </Flex>)
    
    if (!preview) itemProps.leading = ({ data: {}, ...props}) => null


    return <Box {...props}>
        <ItemsView type={props.type||preview?"grid":"tile"} items={items.map((item) => ({
            ...item,
            description: item.excerpt,
            href: purePath(`${_basePathBlog}/${item.slug}`),
        }))} {...itemProps} />
        
        {preview&&<Flex mt="2rem" w="100%" justifyContent="center">
            {/* TODO: the link should calcute from config */}
            <MLink display="inline-flex" alignItems="center" href={_blogListPath}>
                查看更多 <ArrowForwardIcon ml="1" />
            </MLink>
        </Flex>}
        {/* TODO: paginate */}
    </Box>
}

export default PostList