import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";

import Action from "../components/action";
import { useSiteMetadata } from "../utils/hooks";
import kebabCase from "lodash.kebabcase";

const { maxWidth = ["100%", "80%", "80%", "80%", "60rem"] } = useSiteMetadata();

const sectionWidth = (() => {
    let x = Array(maxWidth.length-1).fill("100%");
    x.push(maxWidth.slice(-1)[0]);
    return x;
})()

const _defaultProps = {
    wraper: {
        justifyContent: "center",
    },
    section: {
        p: ["1em", "2em 0", "2.5em 0", "5em 0"],
        mb: [".5em", "1em", "1.5em", "2em"],
        width: sectionWidth, // TODO: with siteMeta and layout props
        marginLeft: "auto",
        marginRight: "auto",
    },
    title: {
        fontFamily: null,
        fontSize: ["md", "xl", "xl", "2xl"],
        fontWeight: "bold",
        my: [".875rem", "1rem"],
    },
    subTitle: {
        fontFamily: null,
        fontSize: ["sm", "md", "md", "xl"],
        fontWeight: "medium",
        color: "gray.500",
    },
    desc: {
        fontFamily: null,
        fontWeight: "normal",
        color: "gray",
    },
};

const _themesProps = {
    dark: {
        section: {
            background: "#000",
            // color: "#fff",
        },
    },
    light: {
        section: {
            
        },
    },
    grey: {
        section: {
            background: "#f5f9fb",
            color: "#000",
        },
    },
};

const _positionProps = {
    left: {
        section: {
            flexDirection: ["column", "column", "row", "row", "row"],
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: ["center", "center", "left", "left", "left"],
        },
    },
    right: {
        section: {
            flexDirection: [
                "column-reverse",
                "column-reverse",
                "row-reverse",
                "row-reverse",
                "row-reverse",
            ],
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: ["center", "center", "left", "left", "left"], // TODO: right or left
        },
    },
    top: {
        section: {
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center",
        },
        header: {
            mb: "2em",
        },
    },
    bottom: {
        section: {
            flexDirection: "column-reverse",
            justifyContent: "space-between",
            textAlign: "center",
        },
        header: {
            mt: "2em",
        },
    },
    center: {
        section: {
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
        },
    },
};

const MSection = ({
    title,
    subTitle,
    description,
    action,
    children,
    wraperBg,
    position = "center",
    theme = "light",
    wraperProps = {},
    titleProps = {},
    subTitleProps = {},
    descProps = {},
    ...props
}) => {
    const _need_header = title || subTitle || description;

    // props from siteMeta

    return (
        // bg put here
        <Flex position="relative" {..._getValue(_defaultProps, {}, "wraper")} {...wraperProps}>
            <Flex
                as="section"
                {..._getValue(_defaultProps, {}, "section")}
                {..._getValue(_positionProps, {}, position, "section")}
                {..._getValue(_themesProps, {}, theme, "section")}
                width={maxWidth}
                {...props}
            >
                {_need_header && (
                    <Box
                        as="header"
                        {..._getValue(_defaultProps, {}, "header")}
                        {..._getValue(_positionProps, {}, position, "header")}
                        {..._getValue(_themesProps, {}, theme, "header")}
                    >
                        {subTitle ? (
                            <Heading
                                as="h3"
                                {..._getValue(_defaultProps, {}, "subTitle")}
                                {..._getValue(
                                    _positionProps,
                                    {},
                                    position,
                                    "subTitle"
                                )}
                                {..._getValue(
                                    _themesProps,
                                    {},
                                    theme,
                                    "subTitle"
                                )}
                                {...subTitleProps}
                            >
                                {subTitle}
                            </Heading>
                        ) : null}
                        {title ? (
                            <Heading
                                as="h2"
                                {..._getValue(_defaultProps, {}, "title")}
                                {..._getValue(
                                    _positionProps,
                                    {},
                                    position,
                                    "title"
                                )}
                                {..._getValue(_themesProps, {}, theme, "title")}
                                {...titleProps}
                                id={typeof title === "string" ? kebabCase(title) : null}
                            >
                                {title}
                            </Heading>
                        ) : null}
                        {description ? (
                            <Text
                                as={Box}
                                {..._getValue(_defaultProps, {}, "desc")}
                                {..._getValue(
                                    _positionProps,
                                    {},
                                    position,
                                    "desc"
                                )}
                                {..._getValue(_themesProps, {}, theme, "desc")}
                                {...descProps}
                            >
                                {description}
                            </Text>
                        ) : null}
                        {action && (
                            <Box mt="1em" mb="2em">
                                {React.isValidElement(action) ? (
                                    action
                                ) : (
                                    <Action {...action} />
                                )}
                            </Box>
                        )}
                    </Box>
                )}
                {/* main body */}
                {children}
                {/* {React.createElement(children, _getValue(_defaultProps, {}, "children"))} */}
            </Flex>
        </Flex>
    );
};

const _getValue = (m, v, ...ks) => {
    if (ks.length === 0) return m || v;
    return _getValue(m[ks[0]] || {}, v, ...ks.slice(1));
};

const _mustValue = (m = {}) => {
    Object.keys(m).forEach((i) => !m[i] && delete (m, i));
    return m;
};

MSection.propTypes = {
    title: PropTypes.node,
    subTitle: PropTypes.node,
    description: PropTypes.node,
    children: PropTypes.node,
    action: PropTypes.object,
    position: PropTypes.oneOf(["left", "right", "top", "bottom", "center"]),
    className: PropTypes.string,
    theme: PropTypes.string,
};

export default MSection;
