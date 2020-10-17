import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Image, Box } from "@chakra-ui/core";
import Img from "gatsby-image";

import { useStaticQuery, graphql } from "gatsby";

const MImage = ({ src, mode = 'fluid', ...props }) => {
    // TODO: take the width and height from props and put to query

    // we need to add `images` for relativePath
    // TODO: auto query for remote images
    const data = useStaticQuery(graphql`
        query LocalImage {
            allFile(filter: { internal: { mediaType: { regex: "/image/" } } }) {
                nodes {
                    name
                    relativePath
                    publicURL
                    childImageSharp {
                        fixed {
                            ...GatsbyImageSharpFixed
                        }
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    `);

    const match = useMemo(
        () =>
            data.allFile.nodes.find(({ relativePath }) => src === relativePath),
        [data, src]
    );

    // check if we are a remote image
    if (src.indexOf("://") >= 0) return <Image src={src} {...props} />;
    
    const v = match && match.childImageSharp && match.childImageSharp[mode];
    
    return !v ? (
        <Image src={match.publicURL} {...props} />
    ) : (
        <Image as={Box} overflow='hidden' {...props}>
            <Img {...{ [mode]: v }} />
        </Image>
    );
};

MImage.protoTypes = {
    src: PropTypes.string.isRequired,
};

export default MImage;
