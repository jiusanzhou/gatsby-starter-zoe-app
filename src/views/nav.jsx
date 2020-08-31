import React from 'react'
import PropTypes from "prop-types"

import Nav from '../components/nav'

import { useSiteMetadata } from "../utils/hooks"

const Navv = (props) => {
    const siteMeta = useSiteMetadata()
    return <Nav menu={ siteMeta.menu } action={{ 
        title: 'Book a call',
        description: <>Get a <strong>free</strong> one-to-one consultation.</>,
        href: '/',
    }} { ...props } />
}

Navv.propTypes = {
    onToggle: PropTypes.func
}

export default Navv