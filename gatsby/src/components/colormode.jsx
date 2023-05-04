import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default ({ ...props }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return <IconButton
        rounded="full"
        color={colorMode === "light" ? "black" : "white"}
        {...props}
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}/>;
}