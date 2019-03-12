import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes, { menu } from '../Routes';

import { SettingsProvider, NotesProvider, PageLayout } from '../../containers';

const App = () => (
  <Router>
    <SettingsProvider>
      <NotesProvider>
        <PageLayout menu={menu}>
          <Routes />
        </PageLayout>
      </NotesProvider>
    </SettingsProvider>
  </Router>
);

export default App;
