import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text } from "@chakra-ui/core";

import Action from "../components/action";

const _defaultProps = {
    wraper: {
        justifyContent: 'center'
    },
    section: {
        p: ["1em", "2em", "2.5em", "5em"],
        mb: [".5em", "1em", "1.5em", "2em"],
        maxW: ["100%", "100%", "100%", "120em"],
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    title: {
        fontFamily: null,
        fontSize: ["md", "xl", "xl", "2xl"],
        fontWeight: "bold",
        my: [".2em", ".5em", ".5em", "1em"]
    },
    subTitle: {
        fontFamily: null,
        fontSize: ["sm", "md", "md", "xl"],
        fontWeight: "medium",
        color: "gray",
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
            color: "#fff",
        },
    },
    light: {
        section: {
            background: "#fff",
            color: "#000",
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
            flexDirection: "row",
            justifyContent: "space-between",
            textAlign: "left",
        },
    },
    right: {
        section: {
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            textAlign: "right",
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

const Section = ({
    title,
    subTitle,
    description,
    action,
    children,
    wraperBg,
    position = "center",
    theme = "light",
    wraperProps = {},
    ...props
}) => {
    const _need_header = title || subTitle || description;

    return (
        // bg put here
        <Flex
            {..._getValue(_defaultProps, {}, "wraper")}
            {...wraperProps}>
            <Flex
                as="section"
                {..._getValue(_defaultProps, {}, "section")}
                {..._getValue(_positionProps, {}, position, "section")}
                {..._getValue(_themesProps, {}, theme, "section")}
                {..._mustValue({})}
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
                            <Text
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
                            >
                                {subTitle}
                            </Text>
                        ) : null}
                        {title ? (
                            <Text
                                as="h2"
                                {..._getValue(_defaultProps, {}, "title")}
                                {..._getValue(
                                    _positionProps,
                                    {},
                                    position,
                                    "title"
                                )}
                                {..._getValue(_themesProps, {}, theme, "title")}
                            >
                                {title}
                            </Text>
                        ) : null}
                        {description ? (
                            <Text
                                as="p"
                                {..._getValue(_defaultProps, {}, "desc")}
                                {..._getValue(
                                    _positionProps,
                                    {},
                                    position,
                                    "desc"
                                )}
                                {..._getValue(_themesProps, {}, theme, "desc")}
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

Section.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node,
    action: PropTypes.object,
    position: PropTypes.oneOf(["left", "right", "top", "bottom", "center"]),
    className: PropTypes.string,
    theme: PropTypes.string,
};

export default Section;
