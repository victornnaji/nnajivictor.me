import React from 'react'
import { Helmet } from 'react-helmet'
import config from '@config';
import _ from 'lodash'
import ogImage from '@images/ogImage.png';
import author from '@images/victor.jpg';
import logo from "@images/vn.png";
import ImageMeta from "./ImageMeta";

const ArticleMeta = ({data}) => {
    const post = data.post;
    const shareImage = post.featuredImage?.fluid.src ? post.featuredImage.fluid.src :ogImage;
    const tags = _.map(post.tags);
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const publisher = logo;
    const canonical = `${config.siteUrl}blog/${post.slug}`;

    const jsonLd = {
        "@context": `https://schema.org/`,
        "@type": `Article`,
        author: {
            "@type": `Person`,
            name: config.name,
            image: author ? author : undefined,
        },
        keywords: tags.length ? tags.join(',') : config.siteKeywords,
        headline: post.title || config.siteTitle,
        url: canonical,
        date: date,
        image: shareImage ? {
            "@type": `ImageObject`,
            url: shareImage,
            width: config.shareImageWidth,
            height: config.shareImageHeight,
        } : undefined,
        publisher: {
            "@type": `Organization`,
            name: config.title,
            logo: {
                "@type": `ImageObject`,
                url: publisher,
                width: 60,
                height: 60,
            },
        },
        description: post.description || config.siteDescription,
        mainEntityOfPage: {
            "@type": `WebPage`,
            "@id": config.siteUrl,
        },
    }
    return (
        <>
        <Helmet>
            <title>{post.title}</title>
            <meta name="description" content={post.description} />
            <link rel="canonical" href={canonical} />
            <meta property="og:site_name" content={config.name} />
                <meta property="og:type" content="article" />
                <meta property="og:title"
                    content={
                        post.title
                    }
                />
            <meta property="og:description"
                content={
                    post.description
                }
            />
            <meta property="og:url" content={canonical} />
            <meta property="article:published_time" content={date} />
            {tags.map((tag, i) => (<meta property="article:tag" content={tag} key={i} />))}

            <meta name="twitter:title"
                    content={
                        post.title
                    }
                />
                <meta name="twitter:description"
                    content={
                        post.description
                    }
                />
                <meta name="twitter:url" content={canonical} />
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content={config.name} />
                {tags && <meta name="twitter:label2" content="Filed under" />}
                {tags && <meta name="twitter:data2" content={tags[0]} />}
                <meta name="twitter:site" content={`https://twitter.com/${config.twitterHandle.replace(/^@/, ``)}/`} />
                <meta name="twitter:creator" content={config.twitterHandle} />
                <script type="application/ld+json">{JSON.stringify(jsonLd, undefined, 4)}</script>
        </Helmet>
        <ImageMeta image={shareImage} />
        </>
    )
}

export default ArticleMeta
