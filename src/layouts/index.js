import React from "react"

import _default from "./default";
import empty from "./empty";

import "../styles/global.css";
import { useSiteMetadata } from "../utils/hooks";

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
    const { layouts = {} } = useSiteMetadata()

    _props = { ..._props, ...(layouts[name] || {}) }

    // create children in here???
    return React.createElement(_layouts[name] || _default, _props);
};
