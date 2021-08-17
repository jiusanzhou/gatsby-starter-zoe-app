import { Link, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link as GatsbyLink } from "gatsby"

import { useSiteMetadata } from "../utils/hooks";

const { primaryColor } = useSiteMetadata()

const MLink = ({ href = "", pure = false, ...props }) => {
    const _props = {}
    if (href.indexOf("://") < 0 && href.indexOf("mailto:") < 0) {
        _props.to = href

        _props.as = GatsbyLink
    } else {
        _props.href = href

        _props.isExternal = true
    }
    
    // TOOD: can't using for PopoverTrigger

    return <Link position="relative" display="inline-block" _before={!pure?{
        content: "''",
        position: "absolute",
        left: 0, bottom: "2px",
        height: "3px", width: "100%",
        bgColor: useColorModeValue(`${primaryColor}.200`, `${primaryColor}.700`),
        transition: "all .2s ease-in-out",
        // transform: "rotate(1deg)",
        zIndex: "-1"
    }:{}}
    _hover={{
        ":before": {
            height: "10px"
        }
    }} {..._props} {...props} />
}

export default MLink