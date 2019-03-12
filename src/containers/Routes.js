import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AboutPage, NotesPage, PageNotFound, SettingsPage } from './index';

export const menu = [
  { icon: 'note', label: 'Notas', path: '/' },
  { icon: 'settings', label: 'Configurações', path: '/settings' },
  { icon: 'info', label: 'Sobre', path: '/about' }
];

const Routes = () => (
  <Switch>
    <Route path='/' exact component={NotesPage} />
    <Route path='/about' exact component={AboutPage} />
    <Route path='/settings' exact component={SettingsPage} />
    <Route component={PageNotFound} />
  </Switch>
);

export default Routes;
