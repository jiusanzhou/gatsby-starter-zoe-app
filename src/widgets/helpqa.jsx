import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Divider, Flex, Heading, HStack, SimpleGrid, StackDivider, Text, useColorModeValue, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React, { useState } from 'react';
import Markdown from 'react-markdown';

import MLink from '../components/link';
import MSection from '../components/section';
import Element from "../components/_element";
import { genColor } from '../styles/colors';

const _categoriesMock = [
    { name: "常见问题", icon: "" },
    { name: "使用入门", icon: "" },
    { name: "文档创建/导入", icon: "" },
    { name: "文档类", icon: "" },
    { name: "表格类", icon: "" },
    { name: "收集表类", icon: "" },
    { name: "幻灯片类", icon: "" },
    { name: "PDF类", icon: "" },
    { name: "思维导图", icon: "" },
    { name: "流程图", icon: "" },
    { name: "分享", icon: "" },
    { name: "权限", icon: "" },
    { name: "文件夹", icon: "" },
    { name: "会员", icon: "" },
]

const HelpCenterHeader = ({ title="嗨，有什么可以帮你？", description, ...props }) => {
    return <Flex display={["none", "flex"]} justifyContent="center" minH="15rem"
    bgSize="cover"
    bgImage="https://a.slack-edge.com/94c06/helpcenter/img/cat-hero-banner-image-2x.png">
        <MSection title={title} description={description} color="white" {...props} />
    </Flex>
}

const HelpCategoriesList = ({ basePathHelp="/help", title="帮助类别", categories=_categoriesMock }) => {
    const columnCount = 3
    const fixed = categories.length % columnCount
    if (fixed) categories.push(...Array(columnCount - fixed).fill({}))
    return <Box py="3"> 
        {title&&<Heading m="2" textAlign="left" fontSize="md">{title}</Heading>}
        <Box bg={useColorModeValue("gray.100", "gray.600")}>
            <SimpleGrid columns={columnCount} spacing={["1px", "2px"]}>
                {categories.map(({ id, name, icon, color }, index) => (
                    !name
                    ?<Box key={index} bg={useColorModeValue("white", "gray.800")} />
                    :<MLink pure key={index}
                    href={`${basePathHelp}/categories/${id}`}>
                        <Center bg={useColorModeValue("white", "gray.800")}
                        p={["3", "10"]}
                        flexDir="column" w="full">
                            <Element w="1.5rem" h="1.5rem" color={color||genColor(index)} type={icon||"SunIcon"} />
                            <Text isTruncated mt={["2", "5"]}>{name}</Text>
                        </Center>
                    </MLink>
                ))}
            </SimpleGrid>
        </Box>
    </Box>
}

const _helpItemsMock = [
    { title: "XX文档如何设置和修改权限？" },
    { title: "XX文档如何设置或修改文档的有效期？" },
    { title: "如何将XX文档制作成资料包，发放给他人领取？" },
    { title: "XX文档怎么创建收集表？" },
    { title: "Y应用开通XX文档指引" },
    { title: "XX文档如何在无网情况下使用？" },
    { title: "共享文件夹里的文档被协作者删除了，可以在哪里找到呢？" },
]

const HelpItemsList = ({ basePathHelp="/help", title="常见问题", items = _helpItemsMock }) => {
    return <Box py="3">
        {title&&<Heading m="2" textAlign="left" fontSize="md">{title}</Heading>}
        <VStack
        divider={<StackDivider borderColor={useColorModeValue("gray.100", "gray.600")} />}
        spacing={1}>
            {items.map(({ id, title, number }, index) => (
                <MLink pure key={index}
                href={`${basePathHelp}/item/${id}`}
                w="full">
                    <Flex w="full" py={[2, 3]} px="2">
                        <Text flex="1" textAlign="left">{title}</Text>
                        <Box w="2rem">
                            <ChevronRightIcon />
                        </Box>
                    </Flex>
                </MLink>
            ))}
        </VStack>
    </Box>
}

const HelpItemDetail = ({ basePathHelp="/help", item: { title, body } }) => {
    // TODO: use mdx
    const [voted, setvoted] = useState(null)
    return <MSection textAlign="left">
        <Heading fontSize="1.25rem">{title}</Heading>
        <Divider my="3" />
        <Markdown children={body} />


        <Center flexDir="column"
        bg={useColorModeValue("gray.100", "gray.600")}
        borderRadius="md" mt={["1rem", "2rem"]} p={["1rem", "2rem"]}>
            <Text>是否解决了您的问题？</Text>
            <HStack spacing="5" mt="3">
                {["😞", "😐", "😃"].map((icon, index) => 
                <Button variant="unstyled"
                fontSize={["1.375rem", "2rem"]} key={index}
                _hover={{
                    transform: "scale(1.32)"
                }}
                onClick={() => setvoted(index)}
                filter={voted!==null&&voted!==index?"grayscale(100%)":null}
                transform={voted===index?"scale(1.32)":"scale(1)"}
                transition="all 0.2s ease-out">
                    {icon}
                </Button>)}
            </HStack>
        </Center>
    </MSection>
} 

export {
    HelpCenterHeader,
    HelpCategoriesList,
    HelpItemsList,
    HelpItemDetail,
}