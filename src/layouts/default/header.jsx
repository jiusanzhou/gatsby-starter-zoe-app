import React from "react";

import PropTypes from "prop-types";
import { Box, Flex, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Logo from "../../views/logo";
import ColorModeSwitcher from "../../components/colormode";
import Navv from "../../views/nav";

const Header = ({ children, border, fixed, wraperBg, logoProps, ...props }) => {
    // TODO: fixed header with scroll
    // TODO: navigation urls

    const { colorMode } = useColorMode();
    return (
            <Flex as="header"
                w="100%"
                position={fixed?"fixed":null}
                top="0"
                borderBottomWidth={border ? "1px" : "0"}
                // bg="white" // TODO: scroll header height to set bg white or layout bg
                bg={wraperBg}
                zIndex="9999"
                bg={colorMode === "light"
                    ? "var(--chakra-colors-white)"
                    : "var(--chakra-colors-gray-800)"}
            >
                <Flex
                    h={["3em", "3.5em", "4em", "4.5em"]}
                    left="0"
                    right="0"
                    top="0"
                    px={["1em", "0", "0", "0"]}
                    margin="0 auto"
                    alignItems="center"
                    {...props}
                >
                    {/* Logo  display={["none", "none", "none", "flex"]} */} 
                    <Logo {...logoProps} />
                    <Flex flex="1" justifyContent="flex-end">
                        {/* Nav Menu */}
                        <Navv />
                        {/* <Logo minimal display={["flex", "flex", "flex", "none"]} {...logoProps} /> */}
                        {/* Other */}
                        <ColorModeSwitcher />
                    </Flex>
                </Flex>
            </Flex>
    );
};

Header.propTypes = {
    menuOpend: PropTypes.bool,
    onToggle: PropTypes.func,
};

export default Header;
