import React, { useContext } from "react";
import { graphql, Link as NavLink, useStaticQuery } from "gatsby";

import PropTypes from "prop-types";
import { Avatar, Flex, Image, Link, Text } from "@chakra-ui/core";

const Logo = ({ href, name, img, expend = true, ...props }) => {
    // h={["3em", "3.5em", "4em", "4.5em"]}
    useContext({ img: "logo-512x512.png" });
    const _queryImages = useStaticQuery(graphql`
        query {
            allFile(filter: { sourceInstanceName: { eq: "images" } }) {
                nodes {
                    name
                    relativePath
                    publicURL
                }
            }
        }
    `);

    return (
        <Link
            zIndex={99}
            as={NavLink}
            to={href || "/"}
            textDecoration="none"
            _hover={{
                textDecoration: "none",
            }}
        >
            <Flex h="100%" alignItems="center" {...props}>
                {img && (
                    <Image
                        borderRadius="0"
                        mr=".4em"
                        h={["1.5em", "1.75em", "1.75em", "2em"]}
                        alt={name}
                        src={
                            img.indexOf("://") >= 0
                                ? img
                                : (() => {
                                      let x = _queryImages.allFile.nodes.find(
                                          (e) => e.relativePath === img
                                      );
                                      return x ? x.publicURL : null;
                                  })()
                        } // img is a remote or local one
                    />
                )}
                {expend && (
                    <Text fontWeight="bold" as="h2">
                        {name}
                    </Text>
                )}
            </Flex>
        </Link>
    );
};

Logo.propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    name: PropTypes.string,
    img: PropTypes.string,
    expend: PropTypes.bool,
    color: PropTypes.string,
};

export default Logo;
