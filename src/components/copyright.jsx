import React from "react";
import { Flex, Icon, Link, Text } from "@chakra-ui/core";
import { AiFillHeart } from "react-icons/ai";

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
                    <Text ml=".5rem">
                        {" Made with "}
                        <Icon as={AiFillHeart} color="tomato" />
                        {author && (
                            <>
                                {" by "}
                                <Link isExternal href={author.href || author.homepage}>
                                    {author.name}
                                </Link>
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

export default Copyright