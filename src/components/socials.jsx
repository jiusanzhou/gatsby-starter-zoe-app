import React from "react"
import { Link } from "gatsby"
import { css } from "linaria"
import { min, max } from "../utils/media"

import {
    IoLogoFacebook, IoLogoTwitter,
    IoLogoGithub, IoLogoLinkedin, IoMdMail,
} from "react-icons/io"

import {
    FaTelegramPlane
} from "react-icons/fa"

import PropTypes from "prop-types"

const _data_base = {
    facebook: 'https://www.facebook.com/',
    twitter: 'https://twitter.com/',
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/',
    telegram: 'https://t.me/',
    email: 'mailto:'
}

const _data_icon = {
    facebook: IoLogoFacebook,
    linkedin: IoLogoLinkedin,
    twitter: IoLogoTwitter,
    telegram: FaTelegramPlane,
    github: IoLogoGithub,
    email: IoMdMail,
}

const styles = {
    list: css`
        display: flex;

        ${max(768, `
            grid-column: 1/2;
        `)}

        ${min(768, `
            justify-content: flex-end;
        `)}

        li + li {
            margin-left: 1.55rem;
        }
    `
}

export const SocialLink = ({ type, username, base }) => {
    // build url with type and username
    if ( !base ) base = _data_base[type]
    if ( !username || !base ) return null
    const icon = _data_icon[type]
    return <a className={ css`
        font-size: 1rem;
    ` } target="_blank" href={ `${base}${username}` } title={ username }>{ icon && React.createElement(icon) }</a>
}

export const Socials = ({ socials }) => {
    return <ul className={ styles.list }>
        { Object.keys(socials).map(key => <li><SocialLink type={ key } username={ socials[key] } /></li>) }
    </ul>
}

SocialLink.propTypes = {
    type: PropTypes.oneOf(Object.keys(_data_base)).isRequired,
    username: PropTypes.string.isRequired,
    base: PropTypes.string,
}

Socials.propTypes = {
    socials: PropTypes.object.isRequired,
}