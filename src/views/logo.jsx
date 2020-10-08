import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import Logo from '../components/logo'

import { useSiteMetadata } from "../utils/hooks"

export default ({...props}) => {
    const siteMeta = useSiteMetadata()
    return <Logo name={siteMeta.title} img={siteMeta.logo} {...props} />
}