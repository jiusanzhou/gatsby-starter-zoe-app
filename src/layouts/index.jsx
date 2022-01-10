import React, { useEffect } from "react";

import { ChakraProvider } from "@chakra-ui/react";

import _default from "./default";
import empty from "./empty";

import "../styles/global.css";
import { theme } from "../styles/theme"

import { useSiteMetadata } from "../utils/hooks";
import { AccentGlobal } from "../components/accent";
import MDXRoot from "../components/mdx";

const _layouts = {
    default: _default,
    empty,
};

export default ({ layout = "default", ...props }) => {
    // merge props from siteMeta
    const { primaryColor, layouts = {} } = useSiteMetadata();

    // if layout is string create with or { name }
    let name;
    let _props = {};
    switch (typeof layout) {
        case "string":
            name = layout;
            _props = { ...props };
            break;
        case "object":
            name = layout.name;
            _props = { ...layout, ...props, name: null };
            break;
        default:
            break;
    }

    // query layout from url query
    // must be client render
    if (typeof window !== "undefined") {
        const params = new URLSearchParams(location.search)
        const _layout = params.get("_layout")
        if (_layout && _layouts[_layout]) name = _layout
    }

    _props = { ..._props, ...(layouts[name] || {}) };

    // generate the max width
    // _props.maxWidth = Array.isArray(_props.maxWidth) ? _props.maxWidth : ["100%", "80%", "80%", "80%", _props.maxWidth]

    // store _props in global css

    // create children in here???
    return (
        <ChakraProvider theme={theme}>
            {/* <AccentGlobal primaryColor={primaryColor} {..._props} /> */}
            <MDXRoot>
                {React.createElement(_layouts[name] || _default, _props)}
            </MDXRoot>
        </ChakraProvider>
    );
};
