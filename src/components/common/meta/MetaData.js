import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import url from 'url'
import config from '../../../config'
import ArticleMeta from './ArticleMeta'
import WebsiteMeta from './WebsiteMeta'

/**
* MetaData will generate all relevant meta data information incl.
* JSON-LD (schema.org), Open Graph (Facebook) and Twitter properties.
*
*/

const MetaData = ({data,
    settings,
    title,
    description,
    image,
    location
}) => {
    const canonical = url.resolve(config.siteUrl, location.pathname)
    return (
        <div>
            
        </div>
    )
}

export default MetaData
