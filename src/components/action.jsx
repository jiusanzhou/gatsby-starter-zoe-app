import React from "react"
import PropTypes from "prop-types"
import { css, cx } from "linaria"

import Button from "./button"

const stylesAction = css`
    display: flex;
    align-items: center;
    flex-direction: column;
    p {
        margin-top: 1.55rem;
    }
`

const Action = ({ children, title, className, description, position = 'bottom', to, onClick }) => {
    return <div className={ cx(stylesAction, className) }>
        <Button to={ to } onClick={ onClick }>{ [title, children].filter(i => i) }</Button>
        { description?<p>{ description }</p>:null }
    </div>
}

Action.propTypes = {
    description: PropTypes.node,
    children: PropTypes.node,
    position: PropTypes.oneOf(['top', 'bottom']),
    to: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
}

export default Action