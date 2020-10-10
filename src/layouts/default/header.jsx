import React from "react";

import PropTypes from "prop-types";
import { Flex } from "@chakra-ui/core";
import Logo from "../../views/logo";

const Header = ({ children, border, ...props }) => {
    // TODO: fixed header with scroll
    // TODO: navigation urls
    return (
        <header>
            <Flex
                w="100%"
                position="fixed"
                top="0"
                borderBottomStyle="solid"
                borderBottomWidth={border ? "1px" : "0"}
            >
                <Flex
                    h={["3em", "3.5em", "4em", "4.5em"]}
                    left="0"
                    right="0"
                    top="0"
                    px={["1em", "0", "0", "0"]}
                    margin="0 auto"
                    {...props}
                >
                    {/* Logo */}
                    <Logo />
                    {/* Menu */}
                    {/* Other */}
                    {children}
                </Flex>
            </Flex>
        </header>
    );
};

Header.propTypes = {
    menuOpend: PropTypes.bool,
    onToggle: PropTypes.func,
};

export default Header;
