import { Link, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link as GatsbyLink } from "gatsby"

import { useSiteMetadata } from "../utils/hooks";

const { primaryColor, pathPrefix } = useSiteMetadata()

const MLink = ({ href = "", pure = false, ...props }) => {
    const _props = {}
    if (href.indexOf("://") < 0 && href.indexOf("mailto:") < 0) {
        // note: fix duplicate pathPrefix for mdx content
        // https://github.com/ChristopherBiscardi/gatsby-mdx/issues/377
        _props.to = (pathPrefix&&pathPrefix!=="/")?href.replace(pathPrefix, ""):href
        // if (_props.to.slice(0,1)!=="/"){_props.to = "/"+_props.to}
        _props.as = GatsbyLink
    } else {
        _props.href = href

        _props.isExternal = true
    }
    
    // TOOD: can't using for PopoverTrigger

    return <Link position="relative" display="inline-block" display={null} _before={!pure?{
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