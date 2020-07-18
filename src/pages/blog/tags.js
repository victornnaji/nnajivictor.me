import React from 'react'
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import kebabCase from 'lodash.kebabcase';
import styled from 'styled-components';
import { Main,theme, mixins } from '@styles';
import Layout from '../../components/layout'
const { colors, fontSizes, fonts } = theme;

const TagsPage = ({data: {
    allContentfulBlogPosts: {group},
    site: {
        siteMetadata: { title },
    },
  },
  location,
}) => {
    return (
        <Layout location={location}>
            <Helmet title={title} />

            <StyledTagsContainer>
                <span className="breadcrumb">
                    <span className="arrow">&larr;</span>
                    <Link to="/blog">All Posts</Link>
                </span>

                <h1>Tags</h1>
                <ul className="fancy-list">
                    {group.map(tag => (
                    <li key={tag.fieldValue}>
                        <Link to={`/blog/tags/${kebabCase(tag.fieldValue)}/`}>
                        {tag.fieldValue} <span className="count">({tag.totalCount})</span>
                        </Link>
                    </li>
                    ))}
                </ul>
            </StyledTagsContainer>
        </Layout>
    )
};

const StyledTagsContainer = styled(Main)`
  max-width: 1000px;

  h1 {
    margin-bottom: 50px;
  }
  ul {
    color: ${colors.lightSlate};
    li {
      font-size: ${fontSizes.xxl};

      a {
        ${mixins.inlineLink};
        color: var(--primary-color);
        .count {
          color: var(--prism-grey);
          font-family: ${fonts.SFMono};
          font-size: ${fontSizes.md};
        }
      }
    }
  }
`;


export const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPosts {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default TagsPage
