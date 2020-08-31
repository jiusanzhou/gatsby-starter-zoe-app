import React from "react"
import { css, cx } from "linaria"

import { min, max } from "../utils/media"

import Logo from "../views/logo"
import Nav from "../views/nav"

import PropTypes from "prop-types"


const stylesHeader = css`
    display:grid;
    align-items:center;
    margin-left:auto;
    margin-right:auto;
    height:100%;
    grid-template-columns:1fr 1fr;
    grid-template-areas:"logo cta burger" "nav nav nav";

    ${max(1085, `
        padding:.775rem 8vw;
        grid-template-rows:60px auto;
        z-index:8;
    `)}

    ${min(768, `
        padding:.775rem 4vw
    `)}

    ${min(1085, `    
        grid-template-columns:1fr auto 2fr;
        grid-template-areas:"logo nav nav";
        padding:0 4vw
    `)}

    ${min(1522, `   
        max-width:87.5rem;
        padding:0
    `)}

    ${max(768, `
        grid-template-rows:44px auto
    `)}
`

const Header = ({ onToggle }) => {
    return <div className={ stylesHeader }>
        <Logo />
        <Nav onToggle={ onToggle } />
    </div>
}

Header.propTypes = {
    menuOpend: PropTypes.bool,
    onToggle: PropTypes.func,
}

export default Header