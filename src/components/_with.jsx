import React from "react"
import { Tooltip, Link, Box } from "@chakra-ui/core";
import { useStaticQuery } from "gatsby";
import { graphql } from "gatsby";

export const _withTooltip = (props) => {
    return props.label ? <Tooltip {...props} /> : props.children;
};

export const _withClickable = ({ clickable, as = Link, children, ...props }) => {
    return clickable ? React.createElement(as, {...props, children}) : children
}

export const _withBackground = ({ as, bg, background, ...props }) => {
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