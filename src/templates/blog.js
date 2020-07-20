import React from 'react'
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import kebabCase from 'lodash.kebabcase';
import styled, { css } from 'styled-components';
import { IconZap } from '@components/icons';
import { theme, mixins, media, Main } from '@styles';
import Layout from '../components/layout';
const { fontSizes, fonts } = theme;

const BlogTemplate = ({location, data, pageContext}) => {
    const {currentPage, numPages, length} = pageContext;

    const prevPage = currentPage -1 === 1 ? `/blog` : `/blog/${currentPage - 1}`;
    const nextPage = `/blog/${currentPage + 1}`;

    const posts = data.allContentfulBlogPosts.edges;
    return (
    <Layout location={location}>
      <Helmet>
        <title>Blog | Nnaji Victor</title>
        <link rel="canonical" href="https://nnajivictor.me/blog" />
      </Helmet>

      <StyledMainContainer length={length}>
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
        <div className="pagination-section cdp" actpage={currentPage}>
          <Link  to={prevPage} className="cdp_i">Prev</Link>
          {Array.from({length: numPages}, (_, i) => {
            return <Link key={i} duration={.2}
            to={`/blog/${i === 0? '': i + 1}`} className={`cdp_i ${i + 1 === currentPage && `active`}`}>{i + 1}</Link>
          })}
          <Link to={nextPage} className="cdp_i">Next</Link>
        </div>
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

  @keyframes cdp-in {
  from {
    transform: scale(1.5);
    opacity: 0;
  }
  to{
    transform: scale(1);
    opacity: 1;
  }
}

  .pagination-section{
    margin-top: 100px;
    display: flex;
    width: 100%;
    justify-content: center;
    animation: cdp-in 500ms 200ms ease both;
    ${media.tablet`margin-top: 50px; flex-wrap: wrap; width: 100%;`}

    &:not([actpage="1"]) .cdp_i:nth-child(1) {
    display: inline-block;
   }

    
    .cdp_i{
      font-size: 14px;
      text-decoration: none;
      
      transition: background 250ms;
      
      display: inline-block;
      text-align: center;
      text-transform: uppercase;
      margin: 0 3px 6px;
      height: 38px;
      min-width: 38px;
      border-radius: 38px;
      border: 2px solid var(--secondary-color);
      line-height: 38px;
      padding: 0;
      color: var(--primary-color);
      font-weight: 700;
      letter-spacing: .03em;
      display: none;

      &:first-child,
      &:last-child {
        padding: 0 16px;
        margin: 0 12px 6px;
      }

      &:last-child,
      &:nth-child(2),
      &:nth-last-child(2) {
        display: inline-block;
      }

      &:hover{
        background: var(--btn-hover-color);
        color: var(--link-color);
      }

    }

    .active{
      background: var(--btn-hover-color);
      color: var(--link-color);
    }
  }

  ${props => props.length && createCSS(props.length + 3)};
  /* put it here */
`;

function createCSS(len){
  let styles = '';
  for (let i = 1; i < len; i += 1){
    styles +=`
      .cdp[actpage="${i}"] {
      /* 3 before */
        .cdp_i:nth-child(${i - 2}):not(:first-child):not(:nth-child(2)) {
          display: inline-block;
          pointer-events: none;
          color: transparent;
          border-color: transparent;
          width: 50px;
          &:after {
            content: '...';
            color: var(--link-color);
            font-size: 32px;
            margin-left: -6px;
          }
        }
        /* 2 before */
        .cdp_i:nth-child(${i - 1}):not(:first-child) {
          display: inline-block;
        }
        /* before */
        .cdp_i:nth-child(${i}):not(:first-child) {
          display: inline-block;
        }
        /* active */
        .cdp_i:nth-child(${i + 1}) {
          background: var(--btn-hover-color);
          color: var(--link-color);
          display: inline-block;
    
          +.cdp_i:last-child {
            display: none !important;
          }
        }
        /* next */
        .cdp_i:nth-child(${i + 2}):not(:last-child) {
          display: inline-block;
        }
        /* 2 next */
        .cdp_i:nth-child(${i + 3}):not(:last-child) {
          display: inline-block;
        }
        /* 3 next */
        .cdp_i:nth-child(${i+4}):not(:last-child):not(:nth-last-child(2)) {
          display: inline-block;
          pointer-events: none;
          color: transparent;
          border-color: transparent;
          width: 50px;
          &:after {
            content: '...';
            color: var(--link-color);
            font-size: 32px;
            margin-left: -6px;
          }
        }
      }
    `
  }
  return css`${styles}`;
}


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
    query getPagination($skip:Int!, $limit: Int!) {
        allContentfulBlogPosts(sort: {order: DESC, fields: date}, limit: $limit, skip: $skip) {
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

export default BlogTemplate;


