import React from "react"
import PropTypes from "prop-types"

import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const query = (src) => `
    query {
        placeholderImage: file(relativePath: { eq: "${src}" }) {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`

const Image = ( { ...props } ) => {
    // const data = useStaticQuery(graphql`${query(src)}`)
    // return <Img { ...props } fluid={data.placeholderImage.childImageSharp.fluid} />

    const src = 'https://via.placeholder.com/640x480/09f.png/fff'
    return <img src={ src } />
}

Image.protoTypes = {
    src: PropTypes.string.isRequired,
}

export default Image