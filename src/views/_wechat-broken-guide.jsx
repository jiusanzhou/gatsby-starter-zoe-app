import React from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/core";
import Logo from "./logo";

export default ({
    title = "Zoe App",
    description = "We can't open in WeChat, please open the url in browser.",
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
            p="2rem"
        >
            <Center flexDir="column" h="100vh">
                <Logo
                    imageProps={{
                        w: "5rem",
                        rounded: "1rem",
                    }}
                    clickable={false}
                    minimal={true}
                />
                {title && <Text mt="1rem">{title}</Text>}
                {description && <Text mt=".5rem" textAlign="center">{description}</Text>}
            </Center>
            {tip && (
                <Box
                    borderRadius=".5rem"
                    position="fixed"
                    right="1rem"
                    top="1rem"
                    p=".5rem"
                    bg="green.500"
                    color="white"
                    {...tipProps}
                >
                    {tip}
                </Box>
            )}
        </Flex>
    );
};
