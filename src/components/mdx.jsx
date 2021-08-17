import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { preToCodeBlock } from "mdx-utils";
import {
    Box, Text, Heading, Code,
    Divider, Link,
    Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption,
    useColorMode, useColorModeValue,
} from "@chakra-ui/react";

import { allComponents } from "./_element";

import MCode from "./code";
import MImage from "./image";
import MLink from "./link";
import kebabCase from "lodash.kebabcase";

const Hr = () =>  <Divider
    borderColor={useColorModeValue(['gray.200', 'gray.600'])}
    my="2.5rem" w="full" />;

const Quote = ({ ...props }) => {
    const { colorMode } = useColorMode()
    return <Box as="blockquote"
        p={[".5rem", "1rem"]}
        paddingLeft={["1rem", "2rem"]}
        // my={[".2em", ".5em"]}
        pos="relative"
        fontStyle="italic"
        fontFamily="'Palatino Linotype', 'Book Antiqua', Palatino, 'STKaiti', 'KaiTi', '楷体', 'SimKai', 'DFKai-SB', 'NSimSun', serif"
        _before={{
            position: "absolute",
            top: "-.3em",
            left: ["-1rem", "-2rem"],
            content: "'\\201c'",
            fontSize: "8em",
            fontFamily: "serif",
            color: useColorModeValue("rgba(0, 0, 0, 0.1)", "var(--chakra-colors-whiteAlpha-300)")
            // color: colorMode === "light" ? "rgba(0, 0, 0, 0.1)" : "var(--chakra-colors-whiteAlpha-300)",
        }} {...props} />
}

const customs = {
    h1: (props) => <Heading as="h1" size="md" fontWeight="bold"
        fontSize={["3xl", "3xl", "3xl", "3xl"]}
        my={[".875rem", "1rem"]}
        id={typeof props.children === "string" ? kebabCase(props.children) : null}
        {...props} />,
    h2: (props) => <Heading as="h2" fontWeight="bold"
        fontSize={["2xl", "2xl", "2xl", "2xl"]}
        my={[".875rem", "1rem"]}
        id={typeof props.children === "string" ? kebabCase(props.children) : null}
        {...props} />,
    h3: (props) => <Heading as="h3" size="lg" fontWeight="bold"
        fontSize={["xl", "xl", "xl", "xl"]}
        my={[".875rem", "1rem"]}
        id={typeof props.children === "string" ? kebabCase(props.children) : null}
        {...props} />,
    h4: (props) => <Heading as="h4" size="sm" fontWeight="bold"
        fontSize={["md", "md", "md", "md"]}
        my={[".875rem", "1rem"]}
        id={typeof props.children === "string" ? kebabCase(props.children) : null}
        {...props} />,
    h5: (props) => <Heading as="h5" size="sm" fontWeight="bold"
        fontSize={["sm", "sm", "sm", "sm"]}
        my={[".875rem", "1rem"]}
        id={typeof props.children === "string" ? kebabCase(props.children) : null}
        {...props} />,
    h6: (props) => <Heading as="h6" size="xs" fontWeight="bold"
        fontSize={["xs", "xs", "xs", "xs"]}
        my={[".875rem", "1rem"]}
        id={typeof props.children === "string" ? kebabCase(props.children) : null}
        {...props} />,
    p: (props) => <Text as="p" lineHeight="tall"
        // fontSize ={["sm", "md", "md", "xl"]}
        overflowWrap="break-word"
        my="1rem" {...props} />,
    a: (props) => <MLink {...props} />,
    img: MImage,
    table: Table, thread: Thead, tbody: Tbody,
    tfoot: Tfoot, tr: Tr, th: Th, td: Td, caption: TableCaption,
    br: (props) => <Box h="16" {...props} />,
    hr: Hr,
    ul: (props) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
    ol: (props) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
    li: (props) => <Box as="li" pb={1} {...props} />,
    inlineCode: (props) => <Code rounded="base" px=".5em" {...props} />,
    pre: (props) => {
        const op = preToCodeBlock(props);
        return op ? <MCode {...op} /> : <pre {...props} />;
    },
    blockquote: Quote,
};

const mdxProvider = (props) => {
    // TODO: with theme???
    return <MDXProvider components={{ ...allComponents, ...customs }} {...props} />;
}

export default mdxProvider;