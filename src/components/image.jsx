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
            allFile(filter: { internal: { mediaType: { regex: "/image/" } } }) {
                nodes {
                    name
                    relativePath
                    publicURL
                    childImageSharp {
                        gatsbyImageData(
                            formats: [WEBP]
                        )
                    }
                }
            }
            allRemoteImage {
                nodes {
                    url
                    localImage {
                        publicURL
                        childImageSharp {
                            gatsbyImageData(
                                formats: [WEBP]
                            )
                        }
                    }
                }
            }
        }
    `);

    const isRemote = src && src.indexOf("://") >= 0;

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

    const v = match.childImageSharp; // && match.childImageSharp[mode];

    if (!props.alt) props.alt = ""

    return <Image objectFit="cover" as={v?GatsbyImage:Image}
        image={v&&v.gatsbyImageData} src={match.publicURL || match.url || src} {...props} />
};

MImage.protoTypes = {
    src: PropTypes.string.isRequired,
};

export default MImage;
