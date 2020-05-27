import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import styled from 'styled-components';
import {InlineIcon } from '@iconify/react';
import sunBehindSmallCloud from '@iconify/icons-openmoji/sun-behind-small-cloud';
import moonIcon from '@iconify/icons-feather/moon';
import { media } from '@styles';

export default ({menuOpen}) => (
  <ThemeToggler>
    {({ theme, toggleTheme }) => (
      <Toggler menuOpen={menuOpen}>
          <label>
            <input className='toggle-checkbox' type='checkbox' 
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
);

const Toggler = styled.div`
 opacity: ${props => (props.menuOpen ? '0' : '1')};
 transition: all .6s;
.toggle-checkbox {
  display: none;
}

.toggle-slot{
  position: relative;
  height: 36px;
  width: 72px;
  border: 2px solid var(--secondary-color);
  border-radius: 26px;
  background-color: inherit;
  transition: background-color 250ms;
}

.toggle-checkbox:checked ~ .toggle-slot {
  background-color: var(--bg);
}

.toggle-button {
  position: absolute;
  transform: translate(43px, 6px);
  height: 20px;
  width: 20px;
  border-radius: 50%;
  line-height: 4.6px;
  background-color: #ffeccf;
  box-shadow:rgb(252, 234, 43) 0px 0px 0px 3px inset;
  transition: background-color 250ms, border-color 250ms, transform 500ms cubic-bezier(.26,2,.46,.71);
}

.toggle-checkbox:checked ~ .toggle-slot .toggle-button {
  background-color: #485367;
  box-shadow:#fff 0px 0px 0px 3px inset;
  transform: matrix(1, 0, 0, 1, 7, 7);
}

.sun-icon {
  position: absolute;
  height: 24px;
  width: 24px;
  color: #ffbb52;
}

.sun-icon-wrapper {
  position: absolute;
  height: 20px;
  width: 20px;
  opacity: 1;
  transform: translate(4px, 4px) rotate(15deg);
  transition: opacity 150ms, transform 500ms cubic-bezier(.26,2,.46,.71);
}

.toggle-checkbox:checked ~ .toggle-slot .sun-icon-wrapper {
  opacity: 0;
  transform: translate(8px, 4px) rotate(0deg);
}

.moon-icon {
  position: absolute;
  height: 20px;
  width: 20px;
  color: var(--primary-color);
}

.moon-icon-wrapper {
  position: absolute;
  height: 20px;
  width: 20px;
  opacity: 0;
  transform: translate(40px, 4px) rotate(0deg);
  transform-origin: 50% 50%;
  transition: opacity 150ms, transform 500ms cubic-bezier(.26,2.5,.46,.71);
}

.toggle-checkbox:checked ~ .toggle-slot .moon-icon-wrapper {
  opacity: 1;
  transform: translate(44px, 4px) rotate(-15deg);
  ${media.tablet`transform: translate(42px, 7px) rotate(0deg);`};
}


`;

