import React from 'react'

import Logo from '../components/logo'

import { useSiteMetadata } from "../utils/hooks"

export default () => {
    const siteMeta = useSiteMetadata()
    return <Logo { ...siteMeta.logo } />
}