import React from "react"
import { css } from "linaria"

import { Link } from "gatsby"

import PropTypes from "prop-types"

const styles = {
    btn: css`
        border-radius: 28px;
        background-color: #da3654;
        color: #fff;
        padding: 1.03333rem 2.06667rem;
        text-decoration: none;
        min-width: 9rem;
        box-shadow: 0 9px 60px 0 rgba(218,54,84,.35);
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0;
        box-shadow: 0 0 0 0 rgba(218,54,84,0);
        transition: box-shadow .3s cubic-bezier(0,.89,.44,1),transform .15s cubic-bezier(0,.89,.44,1);
        will-change: box-shadow,transform;
        cursor: pointer;
        &:hover {
            transform: scale(1.03)  translateZ(0);
            box-shadow: 0 9px 40px 0 rgba(218,54,84,.65);
        }
    `
}

const Button = ( { children, to, text, className } ) => {
    return <Link className={ `${className} ${styles.btn}` } to={ to }>{ children || text }</Link>
}

Button.protoTypes = {
    children: PropTypes.node.isRequired,
    text: String,
    to: String,
    className: String,
}

export default Button