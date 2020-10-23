import React from "react";
import Layout from "../layouts";
import _element from "./_element";

export default ({ pageContext: { page } }) => {
    const { layout, ...pageProps } = page;
    return (
        <Layout layout={layout || "default"}>
            <_element {...pageProps} />
        </Layout>
    );
};
