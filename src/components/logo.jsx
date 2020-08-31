import React from 'react'
import { Link } from "gatsby"

import { css, cx } from "linaria"

import { min, max } from "../utils/media"

import PropTypes from "prop-types"

const styles = {
    logo: css`
        grid-area: logo;
        z-index: 8;
        display: inline-flex;
        align-items: center;
        padding-bottom: 0.4em;
        text-decoration: none;

        span {
            color: #da3654;
            margin-left: 0.2em;
            font-size: 1.9em;
            font-family: Fredoka One, Roboto, sans-serif;
        }

        ${max(640, `
            span {
                display: none;
            }
        `)}
    `,
    logoImg: css`
        max-width: 6.25rem;
        height: 2rem;
        margin: 0;
    `
}

const Logo = ({ className, href, name, img, expend = true, color }) => {
    return <Link className={ className } to={ href || '/' } style={ { width: 'max-content', backgroundColor: 'transparent', textDecoration: 'none' } } >
        <div className={ styles.logo } style={{ color }}>
            { img && <img alt={ name } className={ styles.logoImg } src={ img } /> }
            { expend && <span>{ name }</span> }
        </div>
    </Link>
}

Logo.propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    name: PropTypes.string,
    img: PropTypes.string,
    expend: PropTypes.bool,
    color: PropTypes.string,
}

export default Logo