import React from "react";

import PropTypes from "prop-types";
import { Flex } from "@chakra-ui/core";
import Logo from "../views/logo";
import { useSiteMetadata } from "../utils/hooks";

const Header = ({ children, ...props }) => {
    // TODO: fixed header with scroll
    const { styles: { border } = {} } = useSiteMetadata();
    return (
        <header>
            <Flex
                w="100%"
                position="absolute"
                borderBottomStyle="solid"
                borderBottomWidth={border ? "1px" : "0"}
            >
                <Flex
                    h={["3em", "3.5em", "4em", "4.5em"]}
                    left="0"
                    right="0"
                    top="0"
                    px={["1em", "0", "0", "0"]}
                    w={["100%", "80%", "80%", "80%", "60em"]}
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
