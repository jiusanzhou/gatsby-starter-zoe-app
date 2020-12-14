import React from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/core";
import Logo from "./logo";

export default ({
    title = "Zoe App",
    tip = "Click the button, Open the url in Browser.",
    tipProps = {},
}) => {
    return (
        <Flex
            bg="grey.50"
            justifyContent="center"
            alignItems="center"
            h="100vh"
            w="100vw"
        >
            <Center flexDir="column">
                <Logo
                    imageProps={{
                        w: "5rem",
                        rounded: "1rem",
                    }}
                    clickable={false}
                    minimal={true}
                />
                <Text mt="1rem">{title}</Text>
            </Center>
            <Box
                borderStyle="solid"
                borderWidth="1px"
                borderColor="blue.300"
                borderRadius=".5rem"
                position="fixed"
                right="1rem"
                top="1rem"
                p=".5rem"
                {...tipProps}
            >{tip}</Box>
        </Flex>
    );
};
