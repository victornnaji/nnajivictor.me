import React from 'react'
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash.kebabcase';
import styled from 'styled-components';

const TagsPage = () => {
    return (
        <div>
            
        </div>
    )
};

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
