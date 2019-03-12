import React from 'react';

import withSettings from '../../containers/Settings/withSettings';
import './app-bar.scss';

const AppBar = ({
  isLoading,
  saveHasError,
  onSaveRetry,
  onPrintExcel,
  onOpenMenu,
  theme
}) => (
  <div className='app-bar' style={theme && theme.navBar}>
    <div className='app-bar__container'>
      <button className='app-bar__action' onClick={onOpenMenu}>
        <i className='material-icons'>menu</i>
      </button>
      <span className='app-bar__brand'>Note.js</span>
      {isLoading && (
        <button className='app-bar__action app-bar__action--rotation'>
          <i className='material-icons'>refresh</i>
        </button>
      )}
      {saveHasError && (
        <button
          className='app-bar__action app-bar__action--danger'
          onClick={onSaveRetry}
        >
          <i className='material-icons'>cloud_off</i>
        </button>
      )}
      {!isLoading && (
        <button
          className='app-bar__action app-bar__action--excel'
          onClick={onPrintExcel}
        >
          <i className='material-icons'>table_chart</i>
        </button>
      )}
    </div>
  </div>
);

export default withSettings(AppBar);
