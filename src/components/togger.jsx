import React, { useState } from "react"
import { css, cx } from "linaria"

import { min, max } from "../utils/media"

const Togger = ({ opened, onToggle }) => {
    const openedTogger = css`
        & > span > span {
            transition-delay: .12s;
            transition-timing-function: cubic-bezier(.215,.61,.355,1);
            transform: rotate(45deg);
            background-color: #000;
            &:before {
                top: 0;
                transition: top 75ms ease,opacity 75ms ease .12s;
                opacity: 0;
            }
            &:after {
                bottom: 0;
                transform: rotate(-90deg);
                transition: bottom 75ms ease,transform 75ms cubic-bezier(.215,.61,.355,1) .12s,-webkit-transform 75ms cubic-bezier(.215,.61,.355,1) .12s;
            }
        }
    `
    return <button onClick={ onToggle } className={ cx(css`
    display: inline-block;
    grid-area: burger;
    overflow: visible;
    cursor: pointer;
    border: 0;
    outline: 0;
    padding: 0;
    background-color: transparent;

    ${min(1085, `
        display: none;
    `)}

    `, opened ? openedTogger : '') }>
        <span className={ css`
        position: relative;
        display: inline-block;
        width: 28px;
        height: 24px;
        ` }>
            <span className={ css`
            top: 50%;
            margin-top: -2px;
            &, &:before, &:after {
                position: absolute;
                width: 28px;
                height: 3px;
                transition-timing-function: ease;
                transition-duration: .15s;
                transition-property: transform;
                border-radius: 3px;
                background-color: #000;
                display: block;
            }
            &:before, &:after {
                content: ""
            }
            &:before {
                transition: top 75ms ease .12s,opacity 75ms  cubic-bezier(.55,.055,.675,.19);
                top: -8px;
            }
            &:after {
                transition: bottom 75ms ease .12s,transform 75ms cubic-bezier(.55,.055,.675,.19);
                bottom: -8px;
            }
            ` }></span>
        </span>
    </button>
}

Togger.protoTypes = {
    opened: Boolean,
    onToggle: Function,
}

export default Togger