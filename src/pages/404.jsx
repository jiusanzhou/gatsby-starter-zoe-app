import React from "react";
import { Link } from "gatsby";

import Layout from "../layouts";
import Section from "../components/section";
import MLink from "../components/link";

const NotFoundPage = () => (
    <Layout title="404 Page not found">
        {/* 404 */}
        <Section
            wraperProps={{ minH: "calc(100vh - 10em)" }}
            title="NOT FOUND"
            description="You just hit a route that doesn&#39;t exist... the sadness."
        >
            <MLink href="/">Back to home</MLink>
        </Section>
    </Layout>
);

export default NotFoundPage;
