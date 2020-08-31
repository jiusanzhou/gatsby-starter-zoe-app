import React from "react"
import { Link } from "gatsby"
import { css } from "linaria"

import Layout from "../layout"
import Section from "../components/section"
import Image from "../components/image"

const extendFooter = ( <Section
  className={ css`
    padding: 0;
    padding-bottom: 4.65rem;
  ` }
  theme="black"
  action={{title: "Contact us", to: "/contact"}}
  subDescription="For us customers really do come first because we help them not only grow their businesses but also educate them to understand the tech behind it."
  title="Become one of us"
  position="left"
  description="Do you want to join our team and work remotely from anywhere you’d like? We can’t wait to hear from you!">
    <Image className={ css`max-width: 300px; margin-bottom: 1.45rem` } src="gatsby-astronaut.png" />
  </Section>
)

const IndexPage = () => (
  <Layout extendFooter={ extendFooter }>
    <Section
      title="Meet faster, more secure web."
      subTitle="JAMstack Developers for hire"
      description="Static websites and Progressive Web Applications are secure, scalable, SEO-friendly, and even up to 10x faster.">
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
    </Section>
    <Section
      position="left"
      theme="grey"
      title="Meet faster, more secure web."
      subTitle="JAMstack Developers for hire"
      description="Static websites and Progressive Web Applications are secure, scalable, SEO-friendly, and even up to 10x faster.">
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
        <Link to="/page-2/">Go to page 2</Link>
      </div>
    </Section>
    <Section
      position="right"
      title="Meet faster, more secure web."
      subTitle="JAMstack Developers for hire"
      description="Static websites and Progressive Web Applications are secure, scalable, SEO-friendly, and even up to 10x faster.">
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
        <Link to="/page-2/">Go to page 2</Link>
      </div>
    </Section>
  </Layout>
)

export default IndexPage
