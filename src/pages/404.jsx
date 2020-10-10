import React from "react";
import { Link } from "gatsby";

import Layout from "../layout";
import Section from "../components/section";

const NotFoundPage = () => (
    <Layout title="404 Page not found">
        <Section
            wraperProps={{ minH: "calc(100vh - 10em)" }}
            title="NOT FOUND"
            description="You just hit a route that doesn&#39;t exist... the sadness."
        >
            <Link to="/">Back to home</Link>
        </Section>
    </Layout>
);

export default NotFoundPage;
