import React, { Fragment } from 'react';
import './page-layout.scss';
import { AppBar, NavigationDrawer } from '../index';

const PageLayout = ({
  children,
  isLoading,
  saveHasError,
  onSaveRetry,
  onOpenMenu,
  isMenuOpen,
  onCloseMenu
}) => (
  <Fragment>
    <AppBar
      isLoading={isLoading}
      saveHasError={saveHasError}
      onSaveRetry={onSaveRetry}
      onOpenMenu={onOpenMenu}
    />
    <div className='container'>{children}</div>
    <NavigationDrawer isOpen={isMenuOpen} onCloseMenu={onCloseMenu} />
  </Fragment>
);

export default PageLayout;
