import React, { useState } from "react"
import PropTypes from "prop-types"
import { css, cx } from "linaria"

import { Link } from "gatsby"

import Action from "./action"
import Togger from "./togger"

import { min, max } from "../utils/media"

const stylesNav = css`
    grid-area: nav;
    display: none;
    justify-content: space-between;

    & > ul {
        justify-content: center;
        list-style: none;
        margin: 0;

        & > li {
            margin: 0;
            padding: 0 .3875rem;
        }
    }

    li {
        padding: 0;
        margin: 0;
        
        &:hover > ul {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
    }

    li > a:hover {
        color: #da3654;
    }

    ${min(1085, `
        transition: all .5s ease;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > ul {
            display: flex;
        }
    `)}
`

const stylesNavActive = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-wrap: wrap;
    font-size: 1rem;
    text-align: center;
    margin-top: .775rem;
    margin-bottom: auto;
    border-top: 1px solid rgba(0,0,0,.1);

    ${min(500, `
        font-size: 1.125rem;
    `)}

    & > ul {
        padding-top: .5166666666666666rem;
        width: 100%;
    }

    li {
        padding: 0;
    }

    a {
        padding: .5166666666666666rem 0;
    }

    ${min(500, `
        a {     
            padding: .775rem 0;
        }
    `)}
`

const stylesNavItem = css`
    text-decoration: none;
    border-top: 2px solid transparent;
    color: #121616;
    display: flex;
    align-items: center;
    padding: 2.325rem 1.55rem;
`

const stylesItemActive = css`
    color: #da3654;
    border-top: 2px solid #da3654;
`

const stylesSubNav = css`
    ${max(1085, `
        display: none;
    `)}

    background: #fff;
    border-radius: 8px;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    margin: 0;
    list-style: none;
    box-shadow: 0 9px 60px 0 rgba(60,72,86,.16);
    padding: 1.03333rem 0;
    transition: all .3s cubic-bezier(0,.89,.44,1);
    transform: translateY(-4px);

    & > li {
        & > a {      
            text-decoration: none;
            color: #3c4856;
            padding: .51667rem 1.9375rem;
            display: block;
        }
    }
`

const stylesAction = css`
    justify-self: end;
    ${min(1085, `
        p {
            display: none;
        }
    `)}

    ${max(768, `
        a {
            width: 100%;
        }
    `)}
`

const Nav = ({ menu, action, onToggle, navClassName, itemActiveClassName, minWidth = 1085 }) => {

    const [ opened, setOpened ] = useState(false)

    return <>
    <nav className={ cx(stylesNav, navClassName, opened?stylesNavActive:'') }>
        <ul>
            { menu.map((item, idx) => <li key={ `${idx}-${item.title}`} >
                <Link to={ item.href } className={ stylesNavItem } activeClassName={ cx(stylesItemActive, itemActiveClassName) }>{ item.title }</Link>
                {/* sub items */}
                { !item.items ? null:<ul className={ stylesSubNav }>
                    { item.items.map((item, idx) => <li key={ `${idx}-${item.title}` }>
                        <Link activeClassName={ cx(stylesItemActive, itemActiveClassName) } to={ item.href }>{ item.title }</Link>
                    </li>) }
                </ul> }
            </li>) }
        </ul>
        { !action?null:<Action className={ stylesAction } to={ action.href } description={ action.description }>{ action.title }</Action> }
    </nav>
    <Togger opened = { opened } onToggle={ () => { setOpened(!opened); onToggle && onToggle(!opened) } } />
    </>
}

Nav.protoTypes = {
    menu: PropTypes.object,
    action: PropTypes.object,
    minWidth: PropTypes.number,
    onToggle: PropTypes.func,
    navClassName: PropTypes.string,
    itemActiveClassName: PropTypes.string,
}

export default Nav