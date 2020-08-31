import React from "react"
import { css, cx } from "linaria"
import { min, max } from "../utils/media"

import PropTypes from "prop-types"

import Action from "../components/action"

const themes = {
    dark: {
        background: '#000',
        color: '#fff'
    },
    light: {
        background: '#fff',
        color: '#000'
    },
    grey: {
        background: '#f5f9fb',
        color: '#000'
    }
}

const styles = {
    section: css`
        // display: grid;

        align-items: center;
        padding-bottom: 3.1rem;
        margin: 0 auto 3.1rem;
        border-bottom: 1px solid hsla(0,0%,100%,.1);
        row-gap: 3.1rem;

        display: flex;
        flex-direction: column;

        background: var(--section-theme-background);

        ${min(768, `
            padding: 4.65rem 4vw;
            margin-left: 0;
            margin-right: 0;

            // padding-bottom: 4.65rem;
            // margin-bottom: 4.65rem;
            // grid-template-columns: auto 40%;
            // column-gap: 2.325rem;
        `)}
    `,

    header: css`
        max-width: 43.4rem;
        // margin: 0 auto;
        text-align: center;
        color: var(--section-theme-color);
    `,

    footer: css`
        margin-top: 1.55rem;
        text-align: center;
        max-width: 40.300000000000004rem;
        margin: 0 auto;
    `,

    subTitle: css`
        text-transform: uppercase;
        letter-spacing: .125rem;
        font-family: Poppins,Helvetica,sans-serif;
        font-size: .625rem;
        font-weight: 700;
        margin-bottom: 1.55rem;

        color: var(--section-theme-color);
        opacity: 0.75;

        font-size: .875rem;
        margin-bottom: 2.325rem;
        letter-spacing: .1875rem;
    `,
    title: css`
        font-size: 2.75rem;
    `,
    desc: css`
        color: var(--section-theme-color);
        opacity: 0.70;
        
        line-height: 1.8;
        font-size: 1.25rem;
    `,
    subDesc: css`
        margin-top: 1.55rem;
        ${min(768, `
            margin-top: 2.325rem;
        `)}
    `,
    action: css`
        // width: max-content;
    `,

    position: {
        left: {
            section: css`
                ${min(768, `
                    flex-direction: row;
                    justify-content: space-between;
                `)}
            `,
            action: css`
                align-items: flex-start;
            `
        },
        right: {
            section: css`
                ${min(768, `
                    flex-direction: row-reverse;
                    justify-content: space-between;
                `)}
            `,
            action: css`
                align-items: flex-end;
            `
        }
    }
}

const Section = ({
    title, subTitle, description, action, subDescription,
    borderRadius, background, position,
    className, theme,
    
    children,
}) => {
    const needHeader = title || subTitle || description
    const needFooter = action || subDescription

    const textAlign = [ 'left', 'right' ].indexOf(position) >= 0 ? position : null

    const extendStyles = styles.position[position] || {}

    const buildStyles = {
        background, borderRadius,
    }

    Object.keys(themes[theme] || {}).map(key => {
        buildStyles[`--section-theme-${key}`] = themes[theme][key]
    })

    return <section className={ cx(styles.section, className, extendStyles.section) } style={ buildStyles }>
        {needHeader?<header className={ cx(styles.header) } style={ { textAlign } }>
            { subTitle?<h3 className={ styles.subTitle }>{ subTitle }</h3>:null }
            { title?<h2 className={ styles.title }>{ title }</h2>:null }
            { description?<p className={ styles.desc }>{ description }</p>:null }
            { action?<Action { ...action } className={ cx(styles.action, extendStyles.action) } />:null }
        </header>:null}

        {/* main body */}
        { children }

        {/* TODO: */}
        {/* {needFooter?<footer className={ styles.footer }>
            { subDescription?<p className={ styles.subDesc }>{ subDescription }</p>:null }
            { action?<Action { ...action } className={ styles.action } />:null }
        </footer>:null} */}
    </section>
}

Section.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node,
    subDescription: PropTypes.string,
    action: PropTypes.object,
    position: PropTypes.oneOf(["left", "right", "top", "bottom"]),
    borderRadius: PropTypes.oneOfType([Number, String]),
    background: PropTypes.string,
    className: PropTypes.string,
    theme: PropTypes.string,
}

export default Section
