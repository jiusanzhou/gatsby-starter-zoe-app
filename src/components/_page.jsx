import React from "react";

import Layout from "../layouts";
import Element from "./_element";

const Page = (props) => {
    let page = props.page;
    // pageContext first
    if (props.pageContext) page = props.pageContext.page;
    const { layout, title, ...pageProps } = page;

    return (
        <Layout layout={layout || "default"} title={title}>
            <Element {...pageProps} />
        </Layout>
    );
};

export default Page;