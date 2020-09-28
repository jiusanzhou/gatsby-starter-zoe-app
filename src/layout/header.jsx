import React from "react"

import PropTypes from "prop-types"
import { Flex } from "@chakra-ui/core"

const Header = ({ children, ...props }) => {
    return <Flex
    h={["3em", "5em"]}
    borderBottom="1px solid #E2E8F0" {...props}>
        {/* Logo */}
        {/* Menu */}
        {/* Other */}
        {children}
    </Flex>
}

Header.propTypes = {
    menuOpend: PropTypes.bool,
    onToggle: PropTypes.func,
}

export default Header