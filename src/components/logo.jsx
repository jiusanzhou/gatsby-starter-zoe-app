import React from "react";
import { Link as NavLink } from "gatsby";

import PropTypes from "prop-types";
import { Flex, Link, Text, Tooltip, Box } from "@chakra-ui/core";

import Image from "../components/image";

export const _withTooltip = ({ label, ...props }) => {
    return label ? <Tooltip label={label} {...props} /> : props.children;
};

const Logo = ({
    href,
    name,
    img,
    description,
    minimal = false,
    expend = false,
    ...props
}) => {
    // h={["3em", "3.5em", "4em", "4.5em"]}
    return (
        <Flex flexDirection="column">
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
                    {!minimal && (
                        <Text fontWeight="bold" as="h2">
                            {name}
                        </Text>
                    )}
                </Flex>
            </Link>
            {!minimal && expend && description && (
                <Text mt=".5rem" fontSize="sm" colorScheme="black.800">
                    {description}
                </Text>
            )}
        </Flex>
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
