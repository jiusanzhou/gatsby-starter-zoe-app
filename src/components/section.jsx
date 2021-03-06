import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text } from "@chakra-ui/core";

import Action from "../components/action";

const _defaultProps = {
    wraper: {
        justifyContent: "center",
    },
    section: {
        p: ["1em", "2em", "2.5em 0", "5em 0"],
        mb: [".5em", "1em", "1.5em", "2em"],
        width: ["100%", "100%", "100%", "70rem"], // TODO: with siteMeta and layout props
        marginLeft: "auto",
        marginRight: "auto",
    },
    title: {
        fontFamily: null,
        fontSize: ["md", "xl", "xl", "2xl"],
        fontWeight: "bold",
        my: [".2em", ".5em", ".5em", "1em"],
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
            // background: "#fff",
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
            flexDirection: ["column", "column", "row", "row"],
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: ["center", "center", "left", "left"],
        },
    },
    right: {
        section: {
            flexDirection: [
                "column-reverse",
                "column-reverse",
                "row-reverse",
                "row-reverse",
            ],
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: ["center", "center", "left", "left"], // TODO: right or left
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
        <Flex {..._getValue(_defaultProps, {}, "wraper")} {...wraperProps}>
            <Flex
                as="section"
                {..._getValue(_defaultProps, {}, "section")}
                {..._getValue(_positionProps, {}, position, "section")}
                {..._getValue(_themesProps, {}, theme, "section")}
                {..._mustValue({
                    width: ["100%", "80%", "80%", "80%", "70rem"],
                })} // TODO: from layout
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
                                {...subTitleProps}
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
                                {...titleProps}
                            >
                                {title}
                            </Text>
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
