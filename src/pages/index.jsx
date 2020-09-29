import React from "react";
import { Link } from "gatsby";
import { css } from "linaria";

import Layout from "../layout";
import Section from "../components/section";
import { DownloadButtons } from "../views/app-release";
import { useSiteMetadata } from "../utils/hooks";
import Hero from "../views/hero";

const IndexPage = () => {
    const siteMeta = useSiteMetadata();
    return <Layout>
      {siteMeta.hero && <Hero {...siteMeta.hero} />}
    </Layout>;
};

export default IndexPage;
