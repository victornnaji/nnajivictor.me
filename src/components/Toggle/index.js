import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import styled from 'styled-components';
import {InlineIcon } from '@iconify/react';
import sunBehindSmallCloud from '@iconify/icons-openmoji/sun-behind-small-cloud';
import moonIcon from '@iconify/icons-feather/moon';
import { media } from '@styles';

export default ({menuOpen}) => {
  return(
    <ThemeToggler>
    {({ theme, toggleTheme }) => (
      <Toggler menuOpen={menuOpen}>
          <label>
            <input className='toggle-checkbox' type='checkbox' name="desktop"
              onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
              checked={theme === 'dark'}
            />
            <div className='toggle-slot'>
              <div className='sun-icon-wrapper'>
                <div className="iconify sun-icon" data-icon="feather-sun" data-inline="false">
                  <InlineIcon icon={sunBehindSmallCloud} />
                </div>
              </div>
              <div className='toggle-button'></div>
              <div className='moon-icon-wrapper'>
                <div className="iconify moon-icon" data-icon="feather-moon" data-inline="false">
                   <InlineIcon icon={moonIcon} />
                </div>
              </div>
            </div>
          </label>
      </Toggler>
    )}
  </ThemeToggler>
  )

};

const Toggler = styled.div`
 opacity: ${props => (props.menuOpen ? '0' : '1')};
 transition: all .6s;
  .toggle-checkbox {
    display: none;
  }

.toggle-slot{
  position: relative;
  height: 22px;
  width: 50px;
  border: 1.2px solid var(--secondary-color);
  border-radius: 20px;
  background-color: inherit;
  transition: background-color 250ms;
  cursor: pointer;
}

.toggle-checkbox:checked ~ .toggle-slot {
  background-color: var(--bg);
}

.toggle-button {
  position: absolute;
  /* transform: translate(43px, 6px); */
  transform: translate(27px,3px);
  height: 15px;
  width: 15px;
  border-radius: 50%;
  /* line-height: 4.6px; */
  background-color: #ffeccf;
  box-shadow:rgb(252, 234, 43) 0px 0px 0px 3px inset;
  transition: background-color 250ms, border-color 250ms, transform 500ms cubic-bezier(.26,2,.46,.71);
}

.toggle-checkbox:checked ~ .toggle-slot .toggle-button {
  background-color: #485367;
  box-shadow:#fff 0px 0px 0px 3px inset;
  transform: translate(5px, 3px);
}

.sun-icon {
  position: absolute;
  height: 15px;
  width: 15px;
  color: #ffbb52;
}

.sun-icon-wrapper {
  position: absolute;
  height: 15px;
  width: 15px;
  opacity: 1;
  transform: translate(6px, -4px) rotate(15deg);
  ${media.thone`transform: translate(6px, -1px) rotate(15deg);`}
  transition: opacity 150ms, transform 500ms cubic-bezier(.26,2,.46,.71);
}

.toggle-checkbox:checked ~ .toggle-slot .sun-icon-wrapper {
  opacity: 0;
  transform: translate(8px, 4px) rotate(0deg);
}

.moon-icon {
  position: absolute;
  height: 15px;
  width: 15px;
  color: var(--primary-color);
}

.moon-icon-wrapper {
  position: absolute;
  height: 15px;
  width: 15px;
  opacity: 0;
  transform: translate(29px,-1px) rotate(0deg);
  transform-origin: 50% 50%;
  transition: opacity 150ms, transform 500ms cubic-bezier(.26,2.5,.46,.71);
}

.toggle-checkbox:checked ~ .toggle-slot .moon-icon-wrapper {
  opacity: 1;
  transform: translate(27px,-5px) rotate(-15deg);
  ${media.tablet`transform: translate(27px,-2px) rotate(-15deg);`};
}

`;

