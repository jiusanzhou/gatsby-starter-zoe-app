import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

import _default from "./default";
import empty from "./empty";

import "../styles/global.css";
import { useSiteMetadata } from "../utils/hooks";
import { AccentGlobal } from "../components/accent";
import MDXRoot from "../components/mdx";

const _layouts = {
    default: _default,
    empty,
};

export default ({ layout = "default", ...props }) => {
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

    // merge props from siteMeta
    const { primaryColor, layouts = {} } = useSiteMetadata();

    _props = { ..._props, ...(layouts[name] || {}) };

    // generate the max width
    // _props.maxWidth = Array.isArray(_props.maxWidth) ? _props.maxWidth : ["100%", "80%", "80%", "80%", _props.maxWidth]

    // store _props in global css

    // create children in here???
    return (
        <ChakraProvider>
            <AccentGlobal primaryColor={primaryColor} {..._props} />
            <MDXRoot>
                {React.createElement(_layouts[name] || _default, _props)}
            </MDXRoot>
        </ChakraProvider>
    );
};
