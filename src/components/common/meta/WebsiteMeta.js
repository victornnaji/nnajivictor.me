import React from 'react'
import { Helmet } from 'react-helmet'
import favicon from '@images/favicons/favicon.ico';

const WebsiteMeta = () => {

    return (
        <Helmet>
          <link rel="shortcut icon" href={favicon} />
        </Helmet>
    )
}

export default WebsiteMeta
