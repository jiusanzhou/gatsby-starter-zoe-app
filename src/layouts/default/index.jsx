import React from "react";
import PropTypes from "prop-types";
import { Box, ColorModeScript } from "@chakra-ui/core";

import SEO from "../../views/seo";
import Header from "./header";
import Footer from "./footer";

const Layout = ({
    title,
    description,
    header = {},
    footer = {},
    maxWidth = '60rem',
    children,
    extendFooter,
}) => {

    const _maxWidth = Array.isArray(maxWidth) ? maxWidth : ["100%", "80%", "80%", "80%", maxWidth]
    // const [opened, setOpened] = useState(false);
    return (
        <>
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
            <Footer w={_maxWidth} {...footer}>{extendFooter}</Footer>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    extendFooter: PropTypes.node,
};

// multi layout and register with layouts

export default Layout;
