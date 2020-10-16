import React from "react";
import PropTypes from "prop-types";
import { Image } from "@chakra-ui/core";

import { useStaticQuery, graphql } from "gatsby";

const MImage = ({ src, ...props }) => {
    // we need to add `images` for relativePath
    const _queryImages = useStaticQuery(graphql`
        query LocalImage {
            allFile(filter: { internal: { mediaType: { regex: "/image/" } } }) {
                nodes {
                    name
                    relativePath
                    publicURL
                }
            }
        }
    `);
    let _src =
        src.indexOf("://") >= 0
            ? src
            : (() => {
                  let x = _queryImages.allFile.nodes.find(
                      (e) => e.relativePath === src
                  );
                  return x ? x.publicURL : null;
              })();
    return <Image src={_src} {...props} />;
};

MImage.protoTypes = {
    src: PropTypes.string.isRequired,
};

export default MImage;
