import React from 'react'
import PropTypes from "prop-types"
import { css } from "linaria"

const styles = css`
    position: relative;
    z-index: 9;
    &:before {
        content: "";
        position: absolute;
        inset: 2px 0px 0px;
        z-index: -1;
        margin: 12px -4px 4px -8px;
        background-color: rgb(150, 197, 236);
        border-radius: 12px;
        transform: skewX(10deg) skewY(-2deg);
    }
`

const Highlight = ({ chidlren, color, size = 4 }) => {
    return <span style={ { backgroundColor: color, '--highlight-base-size': size }}>{ chidlren }</span>
}