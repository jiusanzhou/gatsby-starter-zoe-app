import React from "react";
import { Text } from "@chakra-ui/react";

import { useSiteMetadata } from "../utils/hooks";

const InlineText = ({
    underline,
    color, underlineColor,
    gradient,
    rotate = "-2",
    ...props }) => {
    const { primaryColor } = useSiteMetadata()
    const _color = color || primaryColor
    const _underlineColor = underlineColor || primaryColor
    let _before = underline?{
        content: "''", position: "absolute",
        left: 0, bottom: "-.2rem",
        bgColor: _underlineColor,
        bgGradient: gradient,
        height: "3px", width: "100%",
        transform: `rotate(${rotate}deg)`,
        zIndex: "-1"
    }:{}

    return <Text as="span"
        position="relative"
        color={_color}
        bgGradient={gradient}
        bgClip={gradient?'text':null}
        _before={_before}
        {...props} />
}

export default InlineText;