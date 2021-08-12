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

    const { avatar, name, minibio } = author;

    return <Box {...props}>
        <Flex>
            {avatar && (
                <MImage
                    src={avatar}
                    size="md" w="2rem" h="2rem"
                    rounded="full"
                    alt={name} name={name} />
            )}
            {name && (
                <Box ml="1rem">
                    <Text as={"h3"} textAlign="left" fontWeight="bold">{name}</Text>
                    {/* TODO: just add need */}
                    <Socials mt=".2rem" socials={author}/>
                </Box>
            )}
        </Flex>

        {minibio && <Text mt=".5rem" fontSize="sm">{minibio}</Text>}
    </Box>
}

export default AuthorCard;