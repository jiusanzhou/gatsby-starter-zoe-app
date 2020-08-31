import React, { useState } from "react"
import { css, cx } from "linaria"

import PropTypes from "prop-types"

import { min, max } from "../utils/media"

import SEO from "../views/seo"

import Header from "./header"
import Footer from "./footer"

import "./global.css"

const stylesHeader = css`
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 9;
`

const stylesMain = css`
    margin-left: auto;
    margin-right: auto;
    padding-left: 8vw;
    padding-right: 8vw;

    ${min(768, `
        padding-left:4vw;
        padding-right:4vw;
        overflow:hidden
    `)}

    ${min(1522, `
        padding-left:0;
        padding-right:0;
        max-width:87.5rem;
        overflow:visible
    `)}
`

const stylesFooter = css`
    ${min(768, `
        padding-left: 4vw;
        padding-right: 4vw;
        margin: 0 auto 3.1rem;
    `)}

    ${min(1522, `     
        padding:0;
        max-width:87.5rem;
        margin-left:auto;
        margin-right:auto
    `)}
`

const Layout = ({ children, header, footer, extendFooter }) => {
    const [ opened, setOpened ] = useState(false)
    return <>
        <SEO />
        <header className={ cx(stylesHeader, opened?css`
            height: 100vh;
            ${max(1085, `
                overflow:auto;
            `)}
        `:'') }>
            <Header onToggle={ (v) => { setOpened(v) } } />
        </header>
        <main className={ stylesMain }>{children}</main>
        <footer className={ stylesFooter }>
            <Footer>{ extendFooter }</Footer>
        </footer>
    </>
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    extendFooter: PropTypes.node,
}

export default Layout