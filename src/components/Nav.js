import React, { Component } from 'react'
import styled from 'styled-components';
import { theme, mixins, media } from '@styles';
import { Link } from 'gatsby';
import {throttle} from '../utils';
import { navLinks, navHeight} from '@config';
import { Helmet } from 'react-helmet';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Logo from './logo';
import Menu from './menu';
import Toogle from '../components/Toggle'
const { colors, fontSizes, fonts, loaderDelay } = theme;

const DELTA = 5;

class Nav extends Component {
    state = {
        isMounted: !this.props.isHome,
        menuOpen: false,
        scrollDirection: 'none',
        lastScrollTop: 0,
    };

    

    componentDidMount() {
        setTimeout(
          () =>
            this.setState({ isMounted: true }, () => {
              window.addEventListener('scroll', () => throttle(this.handleScroll()));
              window.addEventListener('resize', () => throttle(this.handleResize()));
              window.addEventListener('keydown', e => this.handleKeydown(e));
            }),
          100,
        );
      }
    
      componentWillUnmount() {
        // window.removeEventListener('scroll', () => this.handleScroll());
        // window.removeEventListener('resize', () => this.handleResize());
        // window.removeEventListener('keydown', e => this.handleKeydown(e));
            this.setState = (state,callback)=>{
              return;
          };
      }


      toggleMenu = () => this.setState({ menuOpen: !this.state.menuOpen });

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

      handleResize = () => {
        if (window.innerWidth > 768 && this.state.menuOpen) {
          this.toggleMenu();
        }
      };

      handleKeydown = e => {
        if (!this.state.menuOpen) {
          return;
        }
    
        if (e.which === 27 || e.key === 'Escape') {
          this.toggleMenu();
        }
      };


    

    render() {
        const { isMounted, menuOpen, scrollDirection} = this.state
        const { isHome } = this.props
        const timeout = isHome ? loaderDelay : 0
        const fadeClass = isHome ? "fade" : ""
        const fadeDownClass = isHome ? "fadedown" : "";

        return (
          <StyledContainer scrollDirection={scrollDirection} show={this.props.show}>
            <Helmet>
              <body id={menuOpen ? "blur" : "notblur"} />
            </Helmet>
            <StyledNav>
              <TransitionGroup component={null}>
                {isMounted && (
                  <CSSTransition classNames={fadeClass} timeout={timeout}>
                    <StyledLogo tabindex="-1">
                      {isHome ? (
                        <a href="/" aria-label="home">
                          <Logo />
                        </a>
                      ) : (
                        <Link to="/" aria-label="home">
                          <Logo />
                        </Link>
                      )}
                    </StyledLogo>
                  </CSSTransition>
                )}
              </TransitionGroup>

              <TransitionGroup component={null}>
                  {isMounted && (
                    <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                      <div className="nav-theme-toogler"
                        style={{
                          transitionDelay: `${
                            isHome ? navLinks.length * 100 : 0
                          }ms`,
                        }}
                      > 
                        <Toogle menuOpen={menuOpen}/>
                      </div>
                    </CSSTransition>
                  )}
                </TransitionGroup>

              <TransitionGroup component={null}>
                {isMounted && (
                  <CSSTransition classNames={fadeClass} timeout={timeout}>
                    <StyledHamburger onClick={this.toggleMenu}>
                      <StyledHamburgerBox>
                        <StyledHamburgerInner menuOpen={menuOpen} />
                      </StyledHamburgerBox>
                    </StyledHamburger>
                  </CSSTransition>
                )}
              </TransitionGroup>

              <StyledLink>
                <StyledList>
                  <TransitionGroup component={null}>
                    {isMounted &&
                      navLinks &&
                      navLinks.map(({ url, name }, i) => (
                        <CSSTransition
                          key={i}
                          classNames={fadeDownClass}
                          timeout={timeout}
                        >
                          <StyledListItem
                            key={i}
                            style={{
                              transitionDelay: `${isHome ? i * 100 : 0}ms`,
                            }}
                          >
                            {name === "blog" ? (
                              <Link to={url}>{name}</Link>
                              ) : (
                                <StyledListLink to={url}>{name}</StyledListLink>
                            )}
                          </StyledListItem>
                        </CSSTransition>
                      ))}
                  </TransitionGroup>
                </StyledList>
              </StyledLink>
            </StyledNav>

            <Menu menuOpen={menuOpen} toggleMenu={this.toggleMenu} />
          </StyledContainer>
        )
    }
}


const StyledContainer = styled.header`
  ${mixins.flexBetween};
  position: fixed;
  top: ${props => props.show ? '40px' : '0px'};
  ${media.thone`top:${props => props.show ? '60px' : '0px'};`}
  padding: 0px 50px;
  background-color: var(--bg);
  transition: ${theme.transition};
  z-index: 11;
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  width: 100%;
  height: ${props => (props.scrollDirection === 'none' ? theme.navHeight : theme.navScrollHeight)};
  /* box-shadow: ${props =>
    props.scrollDirection === 'up' ? `0 10px 30px -10px ${colors.shadowNavy}` : 'none'}; */
  transform: translateY(
    ${props => (props.scrollDirection === 'down' ? `-${theme.navScrollHeight}` : '0px')}
  );
  ${media.desktop`padding: 0 40px;`};
  ${media.tablet`padding: 0 15px;`};
`;
const StyledNav = styled.nav`
  ${mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--secondary-color);
  font-family: ${fonts.SFMono};
  counter-reset: item 0;
  z-index: 12;

  .nav-theme-toogler{
    ${media.giant`order: 1`};
    ${media.tablet`order: 0;`}
  }
`;
const StyledLogo = styled.div`
  ${mixins.flexCenter};
  /* a {
    display: block;
    color: ${colors.green};
    width: 42px;
    height: 42px;
    &:hover,
    &:focus {
      svg {
        fill: ${colors.transGreen};
      }
    }
    svg {
      fill: none;
      transition: ${theme.transition};
      user-select: none;
    }
  }  */
`;
const StyledHamburger = styled.div`
  ${mixins.flexCenter};
  overflow: visible;
  margin: 0 -12px 0 0;
  padding: 15px;
  cursor: pointer;
  transition-timing-function: linear;
  transition-duration: 0.15s;
  transition-property: opacity, filter;
  text-transform: none;
  color: inherit;
  border: 0;
  background-color: transparent;
  display: none;
  ${media.tablet`display: flex;`};
`;
const StyledHamburgerBox = styled.div`
  position: relative;
  display: inline-block;
  width: ${theme.hamburgerWidth}px;
  height: 24px;
`;
const StyledHamburgerInner = styled.div`
  background-color: var(--secondary-color);
  position: absolute;
  width: ${theme.hamburgerWidth}px;
  height: 2px;
  border-radius: ${theme.borderRadius};
  top: 50%;
  left: 0;
  right: 0;
  transition-duration: 0.22s;
  transition-property: transform;
  transition-delay: ${props => (props.menuOpen ? `0.12s` : `0s`)};
  transform: rotate(${props => (props.menuOpen ? `225deg` : `0deg`)});
  transition-timing-function: cubic-bezier(
    ${props => (props.menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`)}
  );
  &:before,
  &:after {
    content: '';
    display: block;
    background-color: var(--secondary-color);
    position: absolute;
    left: auto;
    right: 0;
    width: ${theme.hamburgerWidth}px;
    height: 2px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
  }
  &:before {
    width: ${props => (props.menuOpen ? `100%` : `120%`)};
    top: ${props => (props.menuOpen ? `0` : `-10px`)};
    opacity: ${props => (props.menuOpen ? 0 : 1)};
    transition: ${props => (props.menuOpen ? theme.hamBeforeActive : theme.hamBefore)};
  }
  &:after {
    width: ${props => (props.menuOpen ? `100%` : `80%`)};
    bottom: ${props => (props.menuOpen ? `0` : `-10px`)};
    transform: rotate(${props => (props.menuOpen ? `-90deg` : `0`)});
    transition: ${props => (props.menuOpen ? theme.hamAfterActive : theme.hamAfter)};
  }
`;
const StyledLink = styled.div`
  display: flex;
  align-items: center;
  ${media.tablet`display: none;`};
`;
const StyledList = styled.ol`
  ${mixins.flexBetween};
  padding: 0;
  margin: 0;
  list-style: none;
`;
const StyledListItem = styled.li`
  margin: 0 10px;
  position: relative;
  font-size: ${fontSizes.smish};
  counter-increment: item 1;
  color: var(--primary-color);
  /* &:before {
    content: '0' counter(item) '.';
    text-align: right;
    color: var(--secondary-color);
    font-size: ${fontSizes.xs};
  } */
`;
const StyledListLink = styled(Link)`
  padding: 12px 10px;
`;


export default Nav
