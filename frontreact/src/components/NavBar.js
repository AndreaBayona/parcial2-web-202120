import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { I18nSelect } from './I18nSelect';

export const NavBar = ({ onSearchKeyChange, setLanguage }) => {
  const [navState, setNavState] = React.useState({ showingSearch: false });

  const showSearchContainer = (event) => {
    event.preventDefault();
    setNavState({ showingSearch: !navState.showingSearch });
  };

  return (
    <header className='menu'>
      <div className='menu-container'>
        <div className='menu-holder'>
          <h1>ISIS 3710</h1>
          <nav className='menu-items'>
            <div className='menu-links'>
              <Link className='nav-item' aria-current='page' to='/home'>
                <FormattedMessage id='home'/>
              </Link>
              <Link className='nav-item' aria-current='page' to='/report'>
                <FormattedMessage id='report'/>
              </Link>
            </div>
            <div className='menu-actions'>
              <span onClick={(e) => showSearchContainer(e)}>
                <i className='material-icons search'>search</i>
              </span>
              <I18nSelect setLanguage={(newLang) => setLanguage(newLang)}/>
            </div>
          </nav>
        </div>
      </div>
      <div
        className={
          (navState.showingSearch ? 'showing ' : '') + 'search-container'
        }
      >
        <input
          type='text'
          onChange={(e) => onSearchKeyChange(e.target.value)}
        />
        <span onClick={(e) => showSearchContainer(e)}>
          <i className='material-icons close'>close</i>
        </span>
      </div>
    </header>
  );
};
