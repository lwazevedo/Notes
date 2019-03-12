import React from 'react';

import { Header } from '../../components';
import './settings.scss';
import withSettings from './withSettings';

const themes = [
  { key: 'default', label: 'Padrão' },
  { key: 'classic', label: 'Clássico', navBar: { backgroundColor: '#795548' } },
  {
    key: 'light',
    label: 'Light',
    navBar: { backgroundColor: '#fff', color: '#212121' }
  }
];

const SettingsPage = ({ theme: selectedTheme, toggleTheme }) => (
  <div>
    <Header centered>Temas</Header>

    <div className='themes'>
      {themes.map(theme => (
        <button
          key={theme.key}
          className='themes__item'
          style={theme.navBar}
          onClick={() => {
            toggleTheme(theme);
          }}
        >
          <p>
            {theme.label}
            {theme.key === selectedTheme.key && (
              <i className='material-icons'>check</i>
            )}
          </p>
        </button>
      ))}
    </div>
  </div>
);

export default withSettings(SettingsPage);
