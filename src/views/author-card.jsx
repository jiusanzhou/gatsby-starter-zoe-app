import { Avatar, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import MImage from "../components/image";
import MLink from "../components/link";
import { Socials } from "../components/socials";
import { useSiteMetadata } from "../utils/hooks";


const AuthorSimple = ({ author = {}, ...props }) => {
    const { avatar, name, homepage } = author;
    return <MLink pure href={homepage} {...props}><Flex alignItems="center">
        <MImage
            src={avatar}
            size="sm" w="2rem" h="2rem"
            rounded="full"
            alt={author.name} name={name} />
        <Heading fontWeight="normal" fontSize=".875rem" ml=".5rem">{name}</Heading>
    </Flex></MLink>
}

const AuthorCard = ({ simple = false, ...props }) => {
    const { author } = useSiteMetadata();

    if (simple) return <AuthorSimple author={author} {...props} />;

    return <Box {...props}>
        <Flex>
            {author.avatar && (
                <MImage
                    src={author.avatar}
                    size="md" w="2rem" h="2rem"
                    rounded="full"
                    alt={author.name} ame={author.name} />
            )}
            {author.name && (
                <Box ml="1rem">
                    <Text
                        as={"h3"}
                        fontWeight="bold">
                        {author.name}
                    </Text>
                    {/* TODO: just add need */}
                    <Socials
                        socials={(() => {
                            const data = {
                                ...author,
                            };
                            delete data.name;
                            delete data.avatar;
                            delete data.minibio;
                            return data;
                        })()}
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
    </Box>
}

export default AuthorCard;