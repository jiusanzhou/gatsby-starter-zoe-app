import React from "react";
import _element from "./_element";

import WechatBrokenGuide from "../views/_wechat-broken-guide"

const wrapElement = ({ element, props: { pageContext: { pageWrapper = {} } } }) => {
    let m = false;
    try { m = eval(pageWrapper.match) } catch (err) {}
    if (!m) return element;

    // if component is a string, we need to require the component
    // if (typeof pageWrapper.component === "string") {
    //     try {
    //         return require(pageWrapper.component).default
    //     } catch (err) {
    //         console.log("[ERROR] require error:", err)
    //         return element;
    //     }
    // }

    // TODO: remove, this just for debug
    // return <WechatBrokenGuide />;

    // just return config element
    return <_element {...pageWrapper.component} />;
};

export default wrapElement;