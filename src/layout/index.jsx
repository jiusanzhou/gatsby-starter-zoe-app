import React, { useState } from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

import SEO from "../views/seo"
import Header from "./header"
import Footer from "./footer"

import "../styles/global.css"

const Layout = ({ children, extendFooter }) => {
    const [ opened, setOpened ] = useState(false)
    return <>
        <Helmet>
            <meta name="viewport" value="width=device-width, initial-scale=1.0, minimum-scale=1.0"></meta>
        </Helmet>
        <SEO />
        <header>
            <Header />
        </header>
        <main >{children}</main>
        <footer>
            <Footer>{ null && extendFooter }</Footer>
        </footer>
    </>
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    extendFooter: PropTypes.node,
}

export default Layout