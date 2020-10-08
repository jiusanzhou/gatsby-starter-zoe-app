import React from "react";

import Layout from "../layout";
import { useSiteMetadata } from "../utils/hooks";
import Hero from "../views/hero";

const IndexPage = () => {
    const siteMeta = useSiteMetadata();
    return <Layout>
      {siteMeta.hero && <Hero {...siteMeta.hero} />}
    </Layout>;
};

export default IndexPage;
