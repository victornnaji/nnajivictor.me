import React from 'react'
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import kebabCase from 'lodash.kebabcase';
import styled from 'styled-components';
import { IconZap } from '@components/icons';
import Layout from '../../components/layout'
import { theme, mixins, media, Main } from '@styles';
const { fontSizes, fonts } = theme;

const BlogPage = ({location, data}) => {
    const posts = data.allContentfulBlogPosts.edges;
    return (
    <Layout location={location}>
      <Helmet>
        <title>Blog | Nnaji Victor</title>
        <link rel="canonical" href="https://nnajivictor.me/blog" />
      </Helmet>

      <StyledMainContainer>
        <header>
          <h1 className="big-title">Posts</h1>
          <p className="subtitle">
            a collection of all my thoughts and findings
          </p>
        </header>

        <StyledGrid>
          <div className="posts">
            {posts.length > 0 && 
              posts.map( ({ node }, i) => {
                const d = new Date(node.date);

                return (
                  <StyledPost key={i} tabIndex="0">
                    <StyledPostInner>
                      <header>
                        <Link to={`/blog/${node.slug}/`}>
                          <StyledPostHeader>
                              <StyledFolder>
                                <IconZap />
                              </StyledFolder>
                          </StyledPostHeader>
                            <StyledPostName>{node.title}</StyledPostName>
                            <StyledPostDescription>{node.description}</StyledPostDescription>
                        </Link>
                      </header>
                      <footer>
                        <StyledDate>{`${d.toLocaleDateString()}`}</StyledDate>
                        <StyledTags>
                          {node.tags.map((tag, i) => (
                            <li key={i}>
                              <Link to={`/blog/tags/${kebabCase(tag)}/`}>#{tag}</Link>
                            </li>
                          ))}
                        </StyledTags>
                      </footer>
                   </StyledPostInner>
                  </StyledPost>
                )
              })
            }
          </div>
        </StyledGrid>
      </StyledMainContainer>
    </Layout>
    )
};

const StyledMainContainer = styled(Main)`
  & > header {
    text-align: center;
    margin-bottom: 100px;
  }

  footer {
    ${mixins.flexBetween};
    margin-top: 20px;
    width: 100%;
  }
`;

const StyledGrid = styled.div`
  margin-top: 50px;

  .posts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    ${media.desktop`grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));`};
  }
`;

const StyledPostHeader = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 30px;
`;
const StyledFolder = styled.div`
  color: var(--secondary-color);
  svg {
    width: 40px;
    height: 40px;
  }
`;
const StyledPostName = styled.h5`
  margin: 0 0 10px;
  font-size: ${fontSizes.xxl};
  color: var(--heading-color);
`;
const StyledPostDescription = styled.div`
  font-size: 17px;
  color: var(--primary-color);
`;
const StyledDate = styled.span`
  text-transform: uppercase;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.xs};
  color: var(--primary-color);
`;

const StyledPostInner = styled.div`
  ${mixins.flexBetween};
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 2rem 1.75rem;
  height: 100%;
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
  background-color: var(--tertiary-color);
  header,
  a {
    width: 100%;
  }
`;

const StyledPost = styled.div`
  transition: ${theme.transition};
  cursor: default;
  &:hover,
  &:focus {
    outline: 0;
    ${StyledPostInner} {
      transform: translateY(-5px);
    }
  }
`;

const StyledTags = styled.ul`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.xs};
    color: var(--secondary-color);
    line-height: 1.75;
    margin-right: 15px;
    &:last-of-type {
      margin-right: 0;
    }
    a {
      ${mixins.inlineLink};
    }
  }
`;


export const query = graphql`
  {
    allContentfulBlogPosts(sort: {order: DESC, fields: date}) {
      edges {
        node {
          date
          slug
          title
          tags
          id: contentful_id
        }
      }
    }
  }
`;

export default BlogPage;


