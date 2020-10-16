import React from "react";
import * as chakracore from "@chakra-ui/core";
import * as chakraicons from "@chakra-ui/icons";

import _Empty from "./_empty";

const _componentRegistry = {
    // default system component
    ...chakracore,
    ...chakraicons,
};

// auto load from components and views

// load all component from chakra/core
// _on for if
// _onClick for event
// data set for default data

// type: element to render
// children: render first
// props
const createElement = (opts) => {
    // return normal type data
    if (!opts || typeof opts !== "object") return opts;

    const { type, _isobject, ...props } = opts;
    // we just a orignal object
    if (_isobject) return { type, _isobject, ...props };

    const _props = {};

    // render the props
    Object.keys(props).forEach((e) => {
        const _v = props[e];
        if (Array.isArray(_v)) {
            // only when we are a array or object createElemetn again
            _props[e] = _v.map((_e) =>
                typeof _e === "object" ? createElement(_e) : _e
            );
        } else if (typeof _v === "object" && !/[Pp]rops/.test(e || "")) {
            _props[e] = createElement(_v);
        } else {
            // just return
            _props[e] = _v;
        }
    });

    // ok the new _props is here

    // ok do next crate the element
    // load component with type
    if (!type) return React.createElement(_Empty, _props);

    return React.createElement(_componentRegistry[type] || type, {
        // type,
        ..._props,
    });
};

export default createElement;

// const _genName = (n) => {
//     if (!n) return n;
//     // TODO: imporve
//     return n
//         .split(/[-_]/)
//         .map((e) => e[0].toUpperCase() + e.slice(1))
//         .join("");
// };

const _ = (m, { key = "default", as } = {}) => {
    let c = m[key || "default"];
    if (!c) {
        if (typeof m !== "function") return;
        c = m;
    }
    if (as) {
        if (Array.isArray(as)) {
            as.forEach((e) => (_componentRegistry[e] = c));
        } else {
            _componentRegistry[as] = c;
        }
    } else {
        _componentRegistry[c.name] = c;
    }
};

// load all component !!!!!!!!!!!!!! if we want compoennt can be used
// must install at here

// import third package
_(require("react-markdown"), { as: 'Markdown' });

// install custom component
_(require("./copyright"));
_(require("./gotop"));
_(require("./image"));
_(require("./logo"));
_(require("./navlinks"), { as: "NavLinks" });
_(require("./screenshot"), { as: "ScreenShot" });
_(require("./section"));
_(require("./seo"));
_(require("./socials"));

// install custom views
_(require("../views/app-release"));
_(require("../views/logo"));
