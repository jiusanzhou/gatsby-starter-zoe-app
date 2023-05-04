import React, { useEffect } from "react";
import { Text, keyframes, usePrefersReducedMotion } from "@chakra-ui/react";

import Typed from "react-typed";

import { useSiteMetadata } from "../utils/hooks";
import { useState } from "react";

const flicker = keyframes`
    from { opacity: 1 }
    to { opacity: 0 }
`

const getTypeOptions = (opts = {}) => {
    return {
        backSpeed: 100,
        typeSpeed: 100,
        backDelay: 2000,
        ...opts
    }
}

const InlineText = ({
    underline,
    color, underlineColor,
    gradient,
    rotate = "0",
    typing = false,
    typeOptions = {},
    texts = [],
    children,
    ...props }) => {
    const { primaryColor } = useSiteMetadata()
    const _color = color || primaryColor
    const _underlineColor = underlineColor || primaryColor
    const _before = underline?{
        content: "''", position: "absolute",
        left: 0, bottom: "-.5rem",
        bgColor: _underlineColor,
        bgGradient: gradient,
        height: "3px", width: "100%",
        transform: `rotate(${rotate}deg)`,
        zIndex: "-1"
    }:{}

    const prefersReducedMotion = usePrefersReducedMotion()
    const animation = prefersReducedMotion ? undefined : `${flicker} 1.2s ease infinite`
    
    const _after = typing?{
        content: "''", position: "absolute",
        right: ".3rem", bottom: "0",
        bgColor: _underlineColor,
        bgGradient: gradient,
        height: "100%", width: "3px",
        zIndex: "-1",
        animation: animation,
    }:{}

    return <Text as="span"
        position="relative"
        color={_color}
        bgGradient={gradient}
        paddingInline=".5rem"
        paddingRight={typing?".7rem":null}
        bgClip={gradient?'text':null}
        _before={_before}
        _after={_after}
        {...props}>{!texts||!texts.length?children:
            <Typed loop strings={texts} {...getTypeOptions(typeOptions)} />
        }</Text>
}

export default InlineText;