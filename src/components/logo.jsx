import React from "react";
import { Link as NavLink } from "gatsby";

import { css, cx } from "linaria";

import PropTypes from "prop-types";
import { Flex, Image, Link, Text } from "@chakra-ui/core";

const Logo = ({ href, name, img, expend = true }) => {
    // h={["3em", "3.5em", "4em", "4.5em"]}
    return (
        <Link zIndex={99} as={NavLink} to={href || "/"} textDecoration="none" _hover={{
            textDecoration: "none"
        }}>
            <Flex h="100%" alignItems="center">
                {img && (
                    <Image
                        mr=".4em"
                        h={["1.5em", "1.75em", "1.75em", "2em"]}
                        alt={name}
                        src={img}
                    />
                )}
                {expend && <Text fontWeight="bold" as="h2">{name}</Text>}
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
