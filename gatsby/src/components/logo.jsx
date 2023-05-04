import React from "react";
import { Link as NavLink } from "gatsby";

import PropTypes from "prop-types";
import { Flex, Text, Badge } from "@chakra-ui/react";

import Image from "../components/image";
import { _withClickable } from "./_with";

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
    textColor = "",
    imageProps = {},
    ...props
}) => {
    return (
        <Flex
            flexDirection="column"
            justifyContent={!expend ? "center" : "null"}
        >
            <_withClickable
                href={href || "/"}
                clickable={clickable}
                pure
            >
                <Flex h="100%" alignItems="center" {...props}>
                    {img && (
                        <Image
                            borderRadius="0"
                            alt={name}
                            mr={minimal ? "" : ".4em"}
                            w={["2rem", "2rem", "2rem", "2rem"]}
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
                            {...(textColor ? { textColor } : {})}
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
