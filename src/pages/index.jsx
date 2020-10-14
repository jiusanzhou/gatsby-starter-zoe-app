import React from "react";

import Layout from "../layouts";
import { useSiteMetadata } from "../utils/hooks";
import _element from "../components/_element"

const IndexPage = () => {
    const siteMeta = useSiteMetadata();
    return <Layout layout="default">
      {siteMeta.hero && <_element type="Section" {...siteMeta.hero} />}
    </Layout>;
};

export default IndexPage;
