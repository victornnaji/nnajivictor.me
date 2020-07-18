import React from 'react'
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import kebabCase from 'lodash.kebabcase';
import styled from 'styled-components';
import { Main, media } from '@styles';
import Layout from '../components/layout';
import NewsLetter from '../components/NewsLetter';

const PostTemplate = ({ data, location, pageContext }) => {
   const {next, prev} = pageContext;
    const post = data.post;
    const html = post.html.childMarkdownRemark.html;

    return (
        <Layout location={location}>
            <Helmet>
                <title>{post.title} | Nnaji Victor</title>
                <link rel="canonical" href="https://nnajivictor.me/blog" />
            </Helmet>

            <StyledPostContainer>
                <span className="breadcrumb">
                    <span className="arrow">&larr;</span>
                    <Link to="/blog/">All Posts</Link>
                </span>

                <StyledPostHeader>
                    <h1 className="medium-title">{post.title}</h1>
                    <p className="subtitle">
                        <time>
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                        </time>
                        <span>&nbsp;&mdash;&nbsp;</span>
                        {post.tags &&
                        post.tags.length > 0 &&
                        post.tags.map((tag, i) => (
                            <Link key={i} to={`/blog/tags/${kebabCase(tag)}/`} className="tag">
                            #{tag}
                            </Link>
                        ))}
                    </p>
                </StyledPostHeader>
                <StyledPostContent dangerouslySetInnerHTML={{ __html: html }} />
                 <NewsLetter />

                 <NextPostAndPrev>
                     <div className="prev">
                        {prev && 
                            <span className="breadcrumb">
                                <span className="arrow">&larr;</span>
                                <Link to={`/blog/${prev.slug}/`}>
                                    {prev.title}
                                </Link>
                            </span>
                            }
                            &nbsp;
                     </div>
                     <div className="next">
                         {next && 
                         <span className="breadcrumb">
                            <Link to={`/blog/${next.slug}/`}>
                                {next.title}
                            </Link>
                            <span className="arrow">&rarr;</span>
                         </span>
                         }
                         &nbsp;
                     </div>
                 </NextPostAndPrev>
            </StyledPostContainer>
        </Layout>
    )
}

const StyledPostContainer = styled(Main)`
  max-width: 1000px;
`;
const StyledPostHeader = styled.header`
  margin-bottom: 50px;
  .tag {
    margin-right: 10px;
  }
`;
const StyledPostContent = styled.div`
  margin-bottom: 100px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 1em;
  }

  p {
    margin: 1em 0;
    line-height: 1.5;
    color: var(--primary-color);
  }
`;

const NextPostAndPrev = styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--secondary-color);

    ${media.tablet` margin-top: 40px; flex-direction: column;`}

    .next{
        width: 45%;
        ${media.tablet` width: 100%; margin-bottom: 10px;`}
        .arrow{
            margin-left: 10px;
        }
    }

    .prev{
        width: 45%;
        ${media.tablet` width: 100%;`}
    }
`;


export const query = graphql`
  query getPost($slug: String!) {
    post: contentfulBlogPosts(slug: {eq: $slug}) {
      title
      description
      date
      slug
      tags
      html: childContentfulBlogPostsSimpleTextTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;

export default PostTemplate;
