import React from "react"
import { css, cx } from "linaria"
import { Link } from "gatsby"

import { useSiteMetadata } from "../utils/hooks"
import { Socials } from "../components/socials"

import PropTypes from "prop-types"

const styles = {
    footer: css`
        background: #0a0012;
        color: #fff;
        padding: 3.1rem 8vw 1.55rem;
        position: relative;

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

    `,
    main: css`
        display: grid;
        margin-bottom: 1.55rem;
        row-gap: 4.65rem;

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


        ul {
            margin: 0;
        }
    `,
}

const Footer = ( { children } ) => {

    const siteMeta = useSiteMetadata()
    const { copyright, links = [], socials = {} } = siteMeta

    return <div className={ styles.footer }>
        {/* back to top button */}
        {/* <Button className={ styles.gotop } href="#">
            <svg width="16" height="22"><path d="M8 21V1M1 8l7-7 7 7" fill="none" fillRule="evenodd" stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
        </Button> */}

        {/* extend section */}
        { children }

        {/* footer main section */}
        <section className={ styles.main }>
            {/* <Logo className={ styles.logo } /> */}
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