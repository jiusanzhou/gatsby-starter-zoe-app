import React from "react";
import Element from "./_element";

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

    // just return config element
    return <Element {...pageWrapper.component} />;
};

export default wrapElement;