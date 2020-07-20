import React from 'react'
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash.kebabcase';
import styled from 'styled-components';
import { Main} from '@styles';
import Layout from '../components/layout';
import { theme, mixins} from '@styles';
const { colors, fontSizes} = theme;

const TagTemplate = ({ pageContext, data, location }) => {
    const { tag } = pageContext;
    const {edges} = data.tagsGroup;


    return (
        <Layout location={location}>
          <StyledTagsContainer>
            <span className="breadcrumb">
              <span className="arrow">&larr;</span>
              <Link to="/blog">All Blogs</Link>
            </span>
    
            <h1>
              <span>#{tag}</span>
              <span>
                <Link to="/blog/tags">View all tags</Link>
              </span>
            </h1>
    
            <ul className="fancy-list">
              {edges.map(({ node }) => {
                const { title, slug, date, tags } = node;
                return (
                  <li key={slug}>
                    <h2>
                      <Link to={`/blog/${slug}/`}>{title}</Link>
                    </h2>
                    <p className="subtitle">
                      <time>
                        {new Date(date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span>&nbsp;&mdash;&nbsp;</span>
                      {tags &&
                        tags.length > 0 &&
                        tags.map((tag, i) => (
                          <Link key={i} to={`/blog/tags/${kebabCase(tag)}/`} className="tag">
                            #{tag}
                          </Link>
                        ))}
                    </p>
                  </li>
                );
              })}
            </ul>
          </StyledTagsContainer>
        </Layout>
      );
}

const StyledTagsContainer = styled(Main)`
  max-width: 1000px;

  a {
    ${mixins.inlineLink};
  }

  h1 {
    ${mixins.flexBetween};
    margin-bottom: 50px;

    a {
      font-size: ${fontSizes.lg};
      font-weight: 400;
    }
  }

  ul {
    li {
      font-size: 24px;
      h2 {
        font-size: inherit;
        margin: 0;
        a {
          color: var(--primary-color);
        }
      }
      .subtitle {
        color: ${colors.slate};
        font-size: ${fontSizes.sm};

        .tag {
          margin-right: 10px;
        }
      }
    }
  }
`;

export const pageQuery = graphql`
query getPostTags($tag: String!) {
    tagsGroup: allContentfulBlogPosts(sort: {order: DESC, fields: date}, filter: {tags: {eq: $tag}}) {
      totalCount
      edges {
        node {
          title
          description
          date
          slug
          tags
        }
      }
    }
  }
`;
export default TagTemplate;
