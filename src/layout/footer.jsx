import React from "react"
import { css, cx } from "linaria"
import { Link } from "gatsby"

import { min, max } from "../utils/media"
import { useSiteMetadata } from "../utils/hooks"
import Button from "../components/button"
import Logo from "../views/logo"
import Section from "../components/section"
import { Socials } from "../components/socials"

import PropTypes from "prop-types"

const styles = {
    footer: css`
        background: #0a0012;
        color: #fff;
        padding: 3.1rem 8vw 1.55rem;
        position: relative;

        ${min(768, `
            border-radius:16px;
            padding-top:4.65rem;
            padding-left:4.65rem;
            padding-right:4.65rem
        `)}

        ${min(1522, `   
            padding-top:4.65rem;
            padding-left:7.75rem;
            padding-right:7.75rem
        `)}
    `,
    gotop: css`
        border-radius: 100%;
        width: 3.5rem;
        height: 3.5rem;
        position: absolute;
        right: 4.65rem;
        top: 0;
        display:none;
        transform: translateY(-50%);
        padding: 0;
        min-width: unset;
        &:hover {
            transform: translateY(-50%);
        }

        ${min(768, `
            display:flex
        `)}

        ${min(1522, `
            right:7.75rem
        `)}
    `,
    main: css`
        display: grid;
        margin-bottom: 1.55rem;
        row-gap: 4.65rem;

        ${min(1085, `
            margin-bottom: 3.1rem;
            grid-template-columns: 2fr 5fr;
        `)}

        ${min(1200, `
            grid-template-columns:2fr 5fr
        `)}

        ${min(1522, `
            grid-template-columns:2fr 4fr
        `)}

        ul {
            list-style: none;
            font-size: .875rem;

            li {
                margin-bottom: 1.55rem;
            }

            a {
                color: #fff;
                text-decoration: none;
                opacity: .5;
                transition: all .15s cubic-bezier(.7,0,1,.5);

                &:hover {
                    opacity: 1;
                    transition-timing-function: cubic-bezier(.1,.9,.2,1);
                }
            }
        }
    `,
    logo: css`
        span {
            color: #fff;
        }
    `,
    links: css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        -webkit-column-gap: 1.55rem;
        -moz-column-gap: 1.55rem;
        column-gap: 1.55rem;
        row-gap: 2.325rem;

        grid-template-columns: auto auto 140px;

        ${min(768, `
            grid-template-columns: auto auto auto;
        `)}

        ul {
            margin: 0;
        }
    `,
}

const _data = {
    copyright: {
        content: "© 1hour.me - All rights reserved. Made with ❤️ by Zoe"
    },
    links: [
        {
            title: "Company",
            items: [
                {
                    title: "Home",
                    href: "/",
                },
                {
                    title: "About",
                    href: "/about",
                },
                {
                    title: "Blog",
                    href: "/blog",
                },
            ]
        },
        {
            title: "Services",
            items: [
                {
                    title: "Golang",
                    href: "/golang",
                },
                {
                    title: "More >>>",
                    href: "/projects",
                },
            ]
        }
    ],
    socials: {
        twitter: 'jiusanzhou',
        facebook: 'jiusanzhou',
        github: 'jiusanzhou',
        telegram: 'jiusanzhou',
        email: 'hi@zoe.im',
    }
}

const Footer = ( { children } ) => {

    const siteMeta = useSiteMetadata()
    const { copyright, links, socials } = siteMeta

    return <div className={ styles.footer }>
        {/* back to top button */}
        <Button className={ styles.gotop } href="#">
            <svg width="16" height="22"><path d="M8 21V1M1 8l7-7 7 7" fill="none" fillRule="evenodd" stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
        </Button>

        {/* extend section */}
        { children }

        {/* footer main section */}
        <section className={ styles.main }>
            <Logo className={ styles.logo } />
            {/* TODO: use links to section generate grid layout */}
            <nav className={ styles.links }>
                { links.map(i => <div>
                    <p>{ i.title }</p>
                    <ul>
                        { i.items.map(i => <li>
                            <Link to={ i.href }>{ i.title }</Link>
                        </li>) }
                    </ul>
                </div>) }

                {/* social links */}
                <Socials socials={ socials } />
            </nav>
        </section>

        {/* copyright */}
        { copyright ? <p className={ styles.copyright }>{ copyright.content }</p> : null }
    </div>
}

Footer.propTypes = {

}

export default Footer