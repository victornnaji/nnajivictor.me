import React, { Component } from 'react'
import styled from 'styled-components'
// import BG from "../images/banner.png";
import {media} from "@styles";
import {throttle} from '../utils';
import {StaticQuery, graphql} from 'gatsby';
import { navHeight} from '@config';
const DELTA = 5;

class Banner extends Component {
  
  state = {
    isMounted: !this.props.isHome,
    scrollDirection: "none",
    lastScrollTop: 0,
  }

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({ isMounted: true }, () => {
          window.addEventListener("scroll", () => throttle(this.handleScroll()))
        }),
      100
    )
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }

  handleScroll = () => {
    const { isMounted, menuOpen, scrollDirection, lastScrollTop } = this.state;
    const fromTop = window.scrollY;

    // Make sure they scroll more than DELTA
    if (!isMounted || Math.abs(lastScrollTop - fromTop) <= DELTA || menuOpen) {
      return;
    }

    if (fromTop < DELTA) {
      this.setState({ scrollDirection: 'none' });
    } else if (fromTop > lastScrollTop && fromTop > navHeight) {
      if (scrollDirection !== 'down') {
        this.setState({ scrollDirection: 'down' });
      }
    } else if (fromTop + window.innerHeight < document.body.scrollHeight) {
      if (scrollDirection !== 'up') {
        this.setState({ scrollDirection: 'up' });
      }
    }

    this.setState({ lastScrollTop: fromTop });
  };

  render() {
    const {scrollDirection} = this.state
    return (
      <StaticQuery
        query={graphql`
          {
            allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/Banner/"}}) {
              nodes {
                frontmatter {
                  show
                }
                html
              }
            }
          }
        `}
        render={data => 
          <StyledBanner scrollDirection={scrollDirection} dangerouslySetInnerHTML={{ __html: data.allMarkdownRemark.nodes[0].html }} show={data.allMarkdownRemark.nodes[0].frontmatter.show}/>
        }>
  </StaticQuery>
    )
  }
};

const StyledBanner = styled.div`
    background: var(--secondary-color);
    background-size: cover;
    color: var(--bg);
    height: 40px;
    ${media.thone`height: 60px;`}
    margin-top: 0px;
    padding: 0 15px;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    display: ${props => props.show === true ? 'flex' : "none"};
    transform: translateY(
    ${props => (props.scrollDirection === 'down' ? '-110px' : '0px')}
  );
    letter-spacing: 1.1px;
    position: fixed;
    width: 100%;
    z-index: 10;

    p{
        display: block;
        margin: 0;
    }

    a{
        text-decoration: underline;
        color: var(--bg) !important;

        &:hover{
            color: var(--bg);
        }
    }
`;

export default Banner
