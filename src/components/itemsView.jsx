import { Box, Flex, Heading, SimpleGrid, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import React from "react"
import Cover from "./cover"
import MLink from "./link"

const defaultLeading = ({ data: {title, banner}, ...props }) => {
    console.log("=====>", title, banner)
    return <Cover borderRadius=".5rem" title={title} src={banner} {...props} />
}

const defaultTrailing = ({ data, ...props }) => {
    return null
}

const defaultTitle = ({ data: {title, href}, ...props }) => {
    return <Heading isTruncated as="h4" fontSize="1rem" {...props}>{title}</Heading>
}

const defaultSubTitle = ({ data, ...props }) => {
    return null
}

const defaultDescription = ({ data: {description}, ...props } ) => {
    return <Text isTruncated fontSize=".9rem" color={useColorModeValue("gray.700", "gray.200")} {...props}>{description}</Text>
}

const _viewTypeContainers = {
    grid: {
        as: SimpleGrid,
        props: {
            columns: [1, 1, 2, 3],
            spacing: 10,
        },
        containerProps: {
            flexDirection: "column",
            textAlign: "left"
        },
        leadingProps: {},
        bodyProps: {
            mt: "2"
        }
    },
    tile: {
        as: VStack,
        props: {
            spacing: 8,
        },
        containerProps: {
            flexDirection: "row",
            textAlign: "left",
            w: "100%",
            // h: ["4rem", "6rem"],
            overflow: "hidden"
        },
        leadingProps: {
            h: ["4rem", "6rem"],
            w: ["5rem", "8rem"],
            fontSize: [".7rem", ".9rem"],
            mr: 5,
        },
        bodyProps: {
            flex: 1,
            overflow: "hidden",

            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
        }
    }
}

const ItemsView = ({
    containerProps = {},

    leading = defaultLeading,
    leadingProps = {},

    trailing = defaultTrailing,
    trailingProps = {},

    bodyProps = {},

    title = defaultTitle,
    titleProps = {},

    description = defaultDescription,
    descriptionProps = {},

    subTitle = defaultSubTitle,
    subTitleProps = {},

    type = "grid",
    items = [],

    ...props
}) => {
    const viewContainer = _viewTypeContainers[type]
    if (!viewContainer) return <Box p="2" bg="red" color="white">Uknown view type {type}!</Box>
    
    return React.createElement(viewContainer.as, {
        children: items.map((item, index) => (<Flex key={index} {...viewContainer.containerProps} {...containerProps}>
            {React.createElement(leading, { data: item, ...viewContainer.leadingProps, ...leadingProps })}
            <Box {...viewContainer.bodyProps} {...bodyProps}>
                <MLink pure href={item.href} w="100%">
                {React.createElement(title, { data: item, ...titleProps, isTruncated: type !== "grid" })}
                </MLink>
                <MLink pure href={item.href} w="100%">
                {React.createElement(description, { data: item, ...descriptionProps, isTruncated: type !== "grid" })}
                </MLink>
                {React.createElement(subTitle, { data: item, ...subTitleProps })}
            </Box>
            {React.createElement(trailing, { data: item, ...trailingProps })}
        </Flex>)),
        ...viewContainer.props,
        ...props,
    })
}

export default ItemsView