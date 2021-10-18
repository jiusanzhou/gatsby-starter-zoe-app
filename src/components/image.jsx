import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Image, Box } from "@chakra-ui/react";
import { GatsbyImage, StaticImage, getImage, getSrc } from "gatsby-plugin-image"

import { useStaticQuery, graphql } from "gatsby";

const MImage = ({ src, mode = "fluid", ...props }) => {
    // TODO: take the width and height from props and put to query

    // we need to add `images` for relativePath
    // TODO: auto query for remote images
    const data = useStaticQuery(graphql`
        query LocalImage {
            allImageSharp {
                nodes {
                    gatsbyImageData
                    parent {
                        ... on File {
                            id
                            relativePath
                            publicURL
                            parent {
                                ... on RemoteImage {
                                    id
                                    url
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    const isRemote = src && src.indexOf("://") >= 0;

    // find matched image
    let match = data.allImageSharp.nodes.find(({
        parent: { relativePath, parent = {} } }) => {
            // for local iamge            // for remote image
            return relativePath === src || parent && parent.url === src;
        }) || { parent: {publicURL: src} }; // for remote failed image

    if (!props.alt) props.alt = ""

    return <Image objectFit="cover"
        as={match.gatsbyImageData?GatsbyImage:Image}
        image={match.gatsbyImageData}
        src={match.parent.publicURL || src} {...props} />
};

MImage.protoTypes = {
    src: PropTypes.string.isRequired,
};

export default MImage;
