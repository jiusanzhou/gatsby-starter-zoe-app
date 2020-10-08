import React from "react";

import { Box, Flex, SimpleGrid } from "@chakra-ui/core";

import { useSiteMetadata } from "../utils/hooks";
import { Socials } from "../components/socials";
import Logo from "../views/logo";
import GoTop from "../components/gotop";
import Navlinks from "../components/navlinks";
import Copyright from "../components/copyright";

const Footer = ({ children, ...props }) => {
    const siteMeta = useSiteMetadata();
    const {
        copyright,
        primaryColor,
        author,
        links = [],
        socials = {},
    } = siteMeta;
    const { styles: { border } = {} } = siteMeta;
    return (
        <Box
            w="100%"
            position="absolute"
            borderTop={border ? "1px solid #E2E8F0" : null}
        >
            <Box
                left="0"
                right="0"
                top="0"
                px={["1em", "0", "0", "0"]}
                pt="2rem"
                pb="1rem"
                w={["100%", "80%", "80%", "80%", "60em"]}
                margin="0 auto"
                position="relative"
                {...props}
            >
                {/* back to top button */}
                <GoTop colorScheme={primaryColor} />

                {/* extend section */}
                {children}

                {/* footer main section */}
                <Flex flexDirection="column">
                    <Logo />
                    {/* TODO: use links to section generate grid layout */}
                    {(links.length > 0 || Object.keys(socials).length > 0) && (
                        <SimpleGrid
                            mt="2rem"
                            columns={[1, 3, 3, 4]}
                            spacing="1rem"
                        >
                            {/* nav links */}
                            <Navlinks links={links} />

                            {/* social links */}
                            <Socials
                                justifyContent={[null, null, null, "flex-end"]}
                                socials={socials}
                            />
                        </SimpleGrid>
                    )}
                </Flex>

                {/* copyright */}
                {/* {copyright && <Text mt="2rem">{copyright.content}</Text>} */}
                <Copyright mt="2rem" copyright={copyright} author={author} />
            </Box>
        </Box>
    );
};

Footer.propTypes = {};

export default Footer;
