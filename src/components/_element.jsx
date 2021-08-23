import React from "react";
import * as chakracore from "@chakra-ui/react";
import * as chakraicons from "@chakra-ui/icons";

import _Empty from "./_empty";

const _componentRegistry = {};

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

    // TODO: useMemo load views or components from siteMeta

    // render the props
    Object.keys(props).forEach((e) => {
        const _v = props[e];
        if (Array.isArray(_v)) {
            // only when we are a array or object createElemetn again
            _props[e] = _v.map((_e, idx) =>
                typeof _e === "object" ? createElement({ key: idx, ..._e }) : _e
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
//     return n
//         ? n
//               .split(/[-_]/)
//               .map((e) => e[0].toUpperCase() + e.slice(1))
//               .join("")
//         : n;
// };

export const allComponents = _componentRegistry;

export const installComponent = (m, { key = "default", as } = {}) => {
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
    } else if (key !== "default") {
        _componentRegistry[key] = c;
    } else {
        // TODO: after compile c.name is no correct
    }
};

// load all component !!!!!!!!!!!!!! if we want compoennt can be used
// must install at here
[chakracore, chakraicons].forEach((v) => {
    Object.keys(v).forEach((e) => {
        // Only component
        if (/[A-Z]/.test(e[0])) {
            _componentRegistry[e] = v[e];
        }
    });
});

// TODO: how to generate the install component script

// import third package
installComponent(require("react-markdown"), { as: "Markdown" });
installComponent(require("gatsby-plugin-mdx"), { key: "MDXRenderer" });

// install custom component
installComponent(require("./copyright"), { key: "Copyright" });
installComponent(require("./gotop"), { as: "Gotop" });
installComponent(require("./image"), { as: "MImage" });
installComponent(require("./logo"), { as: "Logo" });
installComponent(require("./navlinks"), { as: "NavLinks" });
installComponent(require("./screenshot"), { as: "ScreenShot" });
installComponent(require("./section"), { as: ["MSection", "Section"] });
installComponent(require("./seo"), { as: "SEO" });
installComponent(require("./socials"), { key: "Socials" });
installComponent(require("./colormode"), { as: "ColorModeSwitcher" });

// this will cause:
//   WebpackError: ReferenceError: Cannot access '__WEBPACK_DEFAULT_EXPORT__' before initialization
// installComponent(require("./mdx"), { as: ["mdxProvider", "MDXProvider"] });

// install custom views
installComponent(require("../views/app-release"), { as: "AppRelease" });
installComponent(require("../views/logo"), { as: "ViewLogo" });
installComponent(require("../views/author-card"), { as: "AuthorCard" });
installComponent(require("../views/posts-list"), { as: "PostsList" });
installComponent(require("../views/projects-list"), { as: "ProjectsList"})
installComponent(require("../views/_wechat-broken-guide"), { as: "WechatBrokenGuide" });

// with functoins
installComponent(require("./_with"), { key: "_withBackground" })

// templates for alone veiw

// just for debugging HelpItemsList HelpCenterHeader
installComponent(require("../widgets/helpqa"), { key: "HelpCenterHeader" })
installComponent(require("../widgets/helpqa"), { key: "HelpCategoriesList" })
installComponent(require("../widgets/helpqa"), { key: "HelpItemsList" })