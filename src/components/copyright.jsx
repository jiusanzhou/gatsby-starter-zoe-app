import React from "react";
import {
    Box,
    Flex,
    Icon,
    Link,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Text,
} from "@chakra-ui/core";
import { AiFillHeart } from "react-icons/ai";

import Image from "./image";

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
                                    <PopoverContent>
                                        <Box p="1rem 2rem">
                                            <Image
                                                src={author.avatar}
                                                rounded="full"
                                                width="5rem"
                                                height="5rem"
                                            />
                                        </Box>
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
