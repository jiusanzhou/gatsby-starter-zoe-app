import React from "react";
import PropTypes from "prop-types";
import { Box, ColorModeScript } from "@chakra-ui/core";

import SEO from "../../views/seo";
import Header from "./header";
import Footer from "./footer";
import { useStaticQuery } from "gatsby";
import { graphql } from "gatsby";

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

const _withBackground = ({ as, bg, background, ...props }) => {
    const _bgprops = {};
    const _bg = bg || background;
    if (typeof _bg === "object") {
        Object.keys(_bg).forEach(
            (k) => (_bgprops[`bg${k[0].toUpperCase()}${k.slice(1)}`] = _bg[k])
        );
    } else {
        _bgprops["bg"] = _bg;
    }

    // if image is set, can not query 2 time's
    const _queryImages = useStaticQuery(graphql`
        query LocalImageAsBg {
            allFile(filter: { internal: { mediaType: { regex: "/image/" } } }) {
                nodes {
                    name
                    relativePath
                    publicURL
                }
            }
        }
    `);

    const src = _bgprops["bgImage"];
    const _src =
        src.indexOf("://") >= 0
            ? src
            : (() => {
                  let x = _queryImages.allFile.nodes.find(
                      (e) => e.relativePath === src
                  );
                  return x ? x.publicURL : null;
              })();
    if (_src) _bgprops["bgImage"] = `url(${_src})`;

    return React.createElement(as || Box, { ..._bgprops, ...props });
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    extendFooter: PropTypes.node,
};

// multi layout and register with layouts

export default Layout;
