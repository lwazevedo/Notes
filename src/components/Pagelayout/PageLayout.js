import React, { Fragment } from 'react';
import './page-layout.scss';
import { AppBar, NavigationDrawer } from '../index';
import whithNotes from '../../containers/Notes/withNotes';

const PageLayout = ({
  children,
  isLoading,
  saveHasError,
  onSaveRetry,
  onOpenMenu,
  isMenuOpen,
  onCloseMenu,
  menu
}) => (
  <Fragment>
    <AppBar
      isLoading={isLoading}
      saveHasError={saveHasError}
      onSaveRetry={onSaveRetry}
      onOpenMenu={onOpenMenu}
    />
    <div className='container'>{children}</div>
    <NavigationDrawer
      menu={menu}
      isOpen={isMenuOpen}
      onCloseMenu={onCloseMenu}
    />
  </Fragment>
);

export default whithNotes(PageLayout);
