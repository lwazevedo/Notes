import React, { Fragment, Component } from 'react';

import { AppBar, NavigationDrawer, Container } from '../../components';
import whithNotes from '../Notes/withNotes';

class PageLayout extends Component {
  state = {
    isMenuOpen: false
  };

  handleOpenMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  render() {
    const { children, isLoading, saveHasError, onSaveRetry, menu } = this.props;
    const { isMenuOpen } = this.state;
    return (
      <Fragment>
        <AppBar
          isLoading={isLoading}
          saveHasError={saveHasError}
          onSaveRetry={onSaveRetry}
          onOpenMenu={this.handleOpenMenu}
        />
        <Container>{children}</Container>
        <NavigationDrawer
          menu={menu}
          isOpen={isMenuOpen}
          onCloseMenu={this.handleCloseMenu}
        />
      </Fragment>
    );
  }
}
export default whithNotes(PageLayout);
