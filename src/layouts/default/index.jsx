import React from "react";
import PropTypes from "prop-types";
import { Box, ColorModeScript } from "@chakra-ui/core";

import SEO from "../../views/seo";
import Header from "./header";
import Footer from "./footer";
import { _withBackground } from "../../components/_with";

const Layout = ({
    title,
    description,
    header = {},
    footer = {},
    maxWidth = "60rem",
    children,
    extendFooter,
    ...props
}) => {
    const _maxWidth = Array.isArray(maxWidth)
        ? maxWidth
        : ["100%", "80%", "80%", "80%", maxWidth];

    // TODO: make this configurable
    const bg = {
        size: "cover",
        repeat: "repeat-x",
        attachment: "scroll",
        image: "images/bg-shapes.svg",
        // image: "https://assets.website-files.com/5e1c4fb5db4d5243c0021d34/5e1c4fb5db4d526c44021d44_bg-shapes.svg",
    };

    // const [opened, setOpened] = useState(false);
    // background-image: url("https://assets.website-files.com/5e1c4fb5db4d5243c0021d34/5e1c4fb5db4d526c44021d44_bg-shapes.svg");
    return (
        <_withBackground minH="calc(100vh)" bg={bg}>
            <ColorModeScript initialColorMode="light" />
            {/* inject seo header */}
            <SEO
                title={title}
                description={description}
                meta={[
                    {
                        name: "viewport",
                        content:
                            "width=device-width, initial-scale=1.0, minimum-scale=1.0",
                    },
                ]}
            />
            {/* header */}
            <Header w={_maxWidth} {...header} />
            {/* main body */}
            <Box as="main" pt={["3em", "3.5em", "4em", "4.5em"]}>
                {children}
            </Box>
            {/* footer */}
            <Footer w={_maxWidth} {...footer}>
                {extendFooter}
            </Footer>
        </_withBackground>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    extendFooter: PropTypes.node,
};

// multi layout and register with layouts

export default Layout;
