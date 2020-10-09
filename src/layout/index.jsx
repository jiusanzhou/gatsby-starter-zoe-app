import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import SEO from "../views/seo";
import Header from "./header";
import Footer from "./footer";

import "../styles/global.css";
import { Box, ColorModeScript } from "@chakra-ui/core";

const Layout = ({ children, extendFooter }) => {
    // const [opened, setOpened] = useState(false);
    return (
        <>
            <ColorModeScript initialColorMode="light" />
            <Helmet
                meta={[
                    {
                        name: "viewport",
                        content:
                            "width=device-width, initial-scale=1.0, minimum-scale=1.0",
                    },
                ]}
            />

            <SEO />
            {/* header */}
            <Header />
            {/* main body */}
            <Box as="main" pt={["3em", "3.5em", "4em", "4.5em"]}>
                {children}
            </Box>
            {/* footer */}
            <Footer>{extendFooter}</Footer>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    extendFooter: PropTypes.node,
};

export default Layout;
