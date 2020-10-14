import React from "react";
import chakracore from "@chakra-ui/core";
import chakraicons from "@chakra-ui/icons";

import _Error from "./_error";

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
const createElement = ({ type, _isobject, ...props }) => {
    // we just a orignal object
    if (_isobject) return { type, _isobject, ...props };

    const _props = {};

    // render the props
    Object.keys(props).map((e) => {
        const _v = props[e];
        if (Array.isArray(_v)) {
            _props[e] = _v.map((_e) => createElement(_e));
        } else if (typeof _v === "object") {
            _props[e] = createElement(_v);
        } else {
            // just return
            _props[e] = _v;
        }
    });

    // ok the new _props is here

    // ok do next crate the element
    // load component with type
    return React.createElement(_componentRegistry[type] || _Error, {
        type,
        ..._props,
    });
};

export default createElement;

const _genName = (n) => {
    if (!n) return n;
    // TODO: imporve
    return n
        .split(/[-_]/)
        .map((e) => e[0].toUpperCase() + e.slice(1))
        .join("");
};

export const _installComponent = (name, { key = "default", as = [] } = {}) => {
    try {
        let c = require(name)[key || "default"];
        if (as.length > 0) {
            as.forEach((e) => (_componentRegistry[e] = c));
        } else {
            _componentRegistry[name] = c;
            _componentRegistry[_genName(name)] = c;
        }
    } catch (err) {
        console.log("=>>>>>> can't require component:", name);
    }
};

// load all component !!!!!!!!!!!!!! if we want compoennt can be used
// must install at here
// _installComponent("section");
_installComponent("../views/app-release", { key: "DownloadButtons"});