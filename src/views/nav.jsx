import React from 'react'
import PropTypes from "prop-types"

import Nav from '../components/nav'

import { useSiteMetadata } from "../utils/hooks"

const Navv = (props) => {
    const { navs } = useSiteMetadata()
    return <Nav navs={ navs } { ...props } />
}

Navv.propTypes = {
    onToggle: PropTypes.func
}

export default Navv