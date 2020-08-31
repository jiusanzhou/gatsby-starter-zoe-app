import React from 'react'
import PropTypes from "prop-types"

import SEO from '../components/seo'

import { useSiteMetadata } from "../utils/hooks"

const SEOO = ({ description, meta, title }) => {
    const siteMeta = useSiteMetadata()
    return <SEO
        lang={ siteMeta.lang }
        title={ title || siteMeta.title }
        titleTemplate={`%s | ${siteMeta.title}`}
        meta={ meta }
        description={ description || siteMeta.description } />
}

SEOO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
}

export default SEOO