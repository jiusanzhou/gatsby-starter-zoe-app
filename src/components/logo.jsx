import React from "react";
import { Link as NavLink } from "gatsby";

import PropTypes from "prop-types";
import { Flex, Link, Text, Tooltip, Box, Badge } from "@chakra-ui/core";

import Image from "../components/image";

const _withTooltip = ({ label, ...props }) => {
    return label ? <Tooltip label={label} {...props} /> : props.children;
};

const _withClickable = ({ clickable, children, ...props }) => {
    return clickable ? <Link {...props}>{children}</Link> : children
}

const Logo = ({
    href,
    name,
    img,
    description,
    sup,
    colorScheme,
    minimal = false,
    expend = false,
    clickable = true,
    imageProps = {},
    ...props
}) => {
    return (
        <Flex
            flexDirection="column"
            justifyContent={!expend ? "center" : "null"}
        >
            <_withClickable
                zIndex={99}
                as={NavLink}
                to={href || "/"}
                textDecoration="none"
                clickable={clickable}
                _hover={{
                    textDecoration: "none",
                }}
            >
                <Flex h="100%" alignItems="center" {...props}>
                    {img && (
                        <Image
                            borderRadius="0"
                            alt={name}
                            mr={minimal ? '' : ".4em"}
                            w={["1.5em", "1.75em", "1.75em", "2em"]}
                            src={img} // img is a remote or local one
                            rounded="full"
                            {...imageProps}
                        />
                    )}
                    {!minimal && (
                        <Text
                            textColor={"var(--colors-accent-800)"}
                            fontWeight="bold"
                            fontSize={["xl"]}
                            as="h2"
                        >
                            {name}
                        </Text>
                    )}
                    {!minimal && sup && (
                        <Badge
                            alignSelf="flex-start"
                            ml=".5rem"
                            colorScheme={colorScheme}
                            fontSize=".6rem"
                            fontWeight="normal"
                        >
                            {sup}
                        </Badge>
                    )}
                </Flex>
            </_withClickable>
            {!minimal && expend && description && (
                <Text mt=".5rem" fontSize="sm">
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
