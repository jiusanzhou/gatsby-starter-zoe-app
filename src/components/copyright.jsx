import React from "react";
import {
    Box,
    Flex,
    Icon,
    Link,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";

import Image from "./image";
import { Socials } from "./socials";
import AuthorCard from "../views/author-card";
import MLink from "./link";

const Copyright = ({ copyright = {}, author = {}, ...props }) => {
    return (
        <Flex justifyContent="center" {...props}>
            {copyright.content ? (
                <Text>{copyright.content}</Text>
            ) : (
                <>
                    <Text>
                        {"©"} {copyright.from && `${copyright.from} -`} {new Date().getFullYear()} {copyright.holder}
                        {" - All rights reserved."}
                    </Text>
                    <Text as={Box} ml=".5rem">
                        {" Made with "}
                        <Icon as={AiFillHeart} color="tomato" />
                        {author && (
                            <>
                                {" by "}
                                <Popover trigger="hover">
                                    <PopoverTrigger>
                                        <Box as="span">
                                            <MLink href={author.href || author.homepage || ''}>
                                                {author.name}
                                            </MLink>
                                        </Box>
                                    </PopoverTrigger>
                                    <PopoverContent p="1rem" rounded="1rem">
                                        <PopoverArrow />
                                        <PopoverBody>
                                            <AuthorCard />
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </>
                        )}
                        {copyright.location && ` in ${copyright.location}`}
                        {"."}
                    </Text>
                </>
            )}
        </Flex>
    );
};

export default Copyright;
