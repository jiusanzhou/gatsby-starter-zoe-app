import React from "react";
import {
    Box,
    Flex,
    Icon,
    Link,
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverTrigger,
    Text,
} from "@chakra-ui/core";
import { AiFillHeart } from "react-icons/ai";

import Image from "./image";
import { Socials } from "./socials";

const Copyright = ({ copyright = {}, author = {}, ...props }) => {
    return (
        <Flex justifyContent="center" {...props}>
            {copyright.content ? (
                <Text>{copyright.content}</Text>
            ) : (
                <>
                    <Text>
                        {"©"} {new Date().getFullYear()} {copyright.holder}
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
                                        <Link
                                            isExternal
                                            href={
                                                author.href || author.homepage
                                            }
                                        >
                                            {author.name}
                                        </Link>
                                    </PopoverTrigger>
                                    <PopoverArrow />
                                    <PopoverContent p="1rem" rounded="1rem">
                                        <Flex>
                                            {author.avatar && (
                                                <Box>
                                                    <Image
                                                        src={author.avatar}
                                                        rounded="full"
                                                        width="4rem"
                                                        height="4rem"
                                                    />
                                                </Box>
                                            )}
                                            {author.name && (
                                                <Box ml="1rem">
                                                    <Text
                                                        as={"h3"}
                                                        fontWeight="bold"
                                                    >
                                                        {author.name}
                                                    </Text>
                                                    {/* TODO: just add need */}
                                                    <Socials
                                                        socials={author}
                                                        mt=".2rem"
                                                    />
                                                </Box>
                                            )}
                                        </Flex>
                                        {author.minibio && (
                                            <Box mt=".5rem">
                                                <Text fontSize="sm">
                                                    {author.minibio}
                                                </Text>
                                            </Box>
                                        )}
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
