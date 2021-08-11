import { Box, Center, Flex, Heading, Link, SimpleGrid, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import React from "react"
import ItemsView from "../components/itemsView"

const ProjectList = ({ items, ...props }) => {
    return <ItemsView items={items.map(item => ({
        ...item,
        title: item.name,
        href: item.html_url,
    }))} />
}

export default ProjectList