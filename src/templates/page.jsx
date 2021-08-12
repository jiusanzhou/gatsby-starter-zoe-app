import { graphql } from "gatsby"
import StaticPage from "../components/_page"
import React from "react"

const CustomPage = ({ data: { mdxPage } }) => {
    const { slug, layout, container, title, body } = mdxPage
    
    return <StaticPage page={{
        slug, layout, title,
        children: {
            type: container || "Box",
            // TODO: use props from page.containerProps
            minH: "calc(100vh - 20rem)",
            textAlign: "left",
            children: {
                type: "MDXRenderer",
                children: [ body ]
            }
        }
    }} />
}

export default CustomPage

export const query = graphql`
  query ($slug: String!) {
    mdxPage(slug: { eq: $slug }) {
        slug
        layout
        container
        title
        body
    }
  }
`