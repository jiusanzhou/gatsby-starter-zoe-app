import { Box, Button, Flex, Heading, Link, SimpleGrid, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import React from "react"
import ItemsView from "../components/itemsView"
import { useSiteMetadata } from "../utils/hooks"
import { purePath } from "../utils/helper"
import MLink from "../components/link"
import Tags from "./tags"
import { ArrowForwardIcon, StarIcon } from "@chakra-ui/icons"

const PostList = ({ items = [], preview, ...props }) => {
    const { basePathBlog, primaryColor } = useSiteMetadata()
    const _basePathBlog = basePathBlog || "/blog"
    const _blogListPath = _basePathBlog === "/" ? "/" : _basePathBlog + "s"

    const itemProps = {}
    if (!preview) itemProps.subTitle = ({ data: { tags = [] }, ...props }) => (
        <Flex color={useColorModeValue("gray.400", "gray.700")} mt=".3rem">
            {/* <Text>{createdTime}</Text> */}
            <Tags simple items={(tags||[]).slice(0, 3)} />
        </Flex>)

    if (!preview) itemProps.trailing = ({ data: { createdTime, pinned }, ...props}) => (
        <Flex flexDir="column" ml="1rem"
        alignItems="flex-end" w="fit-content">
            {pinned&&<StarIcon color="yellow.400" />}
            <Text color={useColorModeValue("gray.400", "gray.700")}
            display={["none", "inline-block"]}>{createdTime}</Text>
        </Flex>)
    
    if (!preview) itemProps.leading = ({ data: {}, ...props}) => null


    return <Box {...props}>
        <ItemsView type={props.type||preview?"grid":"tile"} items={items.map((item) => ({
            ...item,
            description: item.description || item.excerpt,
            href: purePath(`${_basePathBlog}/${item.slug}`),
        }))} {...itemProps} />
        
        {preview&&<Flex mt="2rem" w="100%" justifyContent="center">
            {/* TODO: the link should calcute from config */}
            {/* <MLink display="inline-flex" alignItems="center" href={_blogListPath}>
                查看更多 <ArrowForwardIcon ml="1" />
            </MLink> */}

            <Button size="sm" as={MLink} href={_blogListPath} pure
                rightIcon={<ArrowForwardIcon />} colorScheme={primaryColor} variant="outline">
                查看更多
            </Button>
        </Flex>}
        {/* TODO: paginate */}
    </Box>
}

export default PostList