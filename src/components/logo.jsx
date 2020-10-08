import React, { useContext } from "react";
import { graphql, Link as NavLink, useStaticQuery } from "gatsby";

import PropTypes from "prop-types";
import { Avatar, Flex, Link, Text } from "@chakra-ui/core";

import Image from "../components/image"

const Logo = ({ href, name, img, expend = true, ...props }) => {
    // h={["3em", "3.5em", "4em", "4.5em"]}
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
                        src={img} // img is a remote or local one
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
