import React from "react";
import { Flex, Icon, Link, Text } from "@chakra-ui/core";
import { AiFillHeart } from "react-icons/ai";

export default ({ copyright = {}, author = {}, ...props }) => {
    return (
        <Flex {...props}>
            {copyright.content ? (
                <Text>{copyright.content}</Text>
            ) : (
                [
                    <Text key="__1">
                        {"©"} {new Date().getFullYear()} {copyright.holder}
                        {" - All rights reserved.  "}
                    </Text>,
                    <Text key="__2">
                        Made with <Icon as={AiFillHeart} color="tomato" />
                        {author && [
                            ` by `,
                            <Link isExternal href={author.href}>{author.name}</Link>
                        ]}
                        {copyright.location && ` in ${copyright.location}`}
                    </Text>,
                ]
            )}
        </Flex>
    );
};
