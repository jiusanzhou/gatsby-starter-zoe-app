import React from "react";
import { Flex, Icon, Link, Text } from "@chakra-ui/core";
import { AiFillHeart } from "react-icons/ai";

export default ({ copyright = {}, author = {}, ...props }) => {
    return (
        <Flex justifyContent="space-between" {...props}>
            {copyright.content ? (
                <Text>{copyright.content}</Text>
            ) : (
                <>
                    <Text>
                        {"©"} {new Date().getFullYear()} {copyright.holder}
                        {" - All rights reserved."}
                    </Text>
                    <Text>
                        {" Made with "}
                        <Icon as={AiFillHeart} color="tomato" />
                        {author && (
                            <>
                                {" by "}
                                <Link isExternal href={author.href}>
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
