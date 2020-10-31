import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Image, Box } from "@chakra-ui/core";
import Img from "gatsby-image";

import { useStaticQuery, graphql } from "gatsby";

const MImage = ({ src, mode = "fluid", ...props }) => {
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
            allRemoteImage {
                nodes {
                    url
                    localImage {
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
        }
    `);

    const isRemote = src.indexOf("://") >= 0;

    let match = useMemo(
        () =>
            data[
                isRemote ? "allRemoteImage" : "allFile"
            ].nodes.find(({ relativePath, url }) =>
                isRemote ? src === url : src === relativePath
            ),
        [data, src, isRemote]
    );

    if (isRemote && match) match = match.localImage; // important!!!

    // check if we are a remote image
    // if (isRemote && !match) return <Image src={src} {...props} />;
    if (!match) match = {};

    const v = match.childImageSharp && match.childImageSharp[mode];

    return !v ? (
        <Image src={match.publicURL || match.url || src} {...props} />
    ) : (
        <Image as={Box} overflow="hidden" {...props}>
            <Img {...{ [mode]: v }} />
        </Image>
    );
};

MImage.protoTypes = {
    src: PropTypes.string.isRequired,
};

export default MImage;
