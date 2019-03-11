import React, { Fragment } from 'react';
import uuid from 'uuid/v1';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AppBar, NavigationDrawer } from '../components';

import About from './About';
import Notes from './Notes';

import NoteService from '../services/NoteService';

class App extends React.Component {
  state = {
    notes: [],
    isLoading: false,
    isMenuOpen: false,
    reloadHasError: false,
    saveHasError: false
  };

  componentDidCatch() {
    this.setState({ reloadHasError: true });
  }
  componentDidMount() {
    this.handleReload();
  }

  handleAddNote = text => {
    this.setState(prevState => {
      const notes = prevState.notes.concat({ id: uuid(), text });

      this.handleSave(notes);

      return { notes };
    });
  };

  handleMove = (direction, index) => {
    this.setState(prevState => {
      const newNotes = prevState.notes.slice();
      const removedNote = newNotes.splice(index, 1)[0];

      if (direction === 'up') {
        newNotes.splice(index - 1, 0, removedNote);
      } else {
        newNotes.splice(index + 1, 0, removedNote);
      }

      this.handleSave(newNotes);

      return {
        notes: newNotes
      };
    });
  };

  handleDelete = id => {
    this.setState(prevState => {
      const newNotes = prevState.notes.slice();
      const index = newNotes.findIndex(note => note.id === id);
      newNotes.splice(index, 1);

      this.handleSave(newNotes);

      return {
        notes: newNotes
      };
    });
  };

  handleEdit = (id, text) => {
    this.setState(prevState => {
      const newNotes = prevState.notes.slice();
      const index = newNotes.findIndex(note => note.id === id);
      newNotes[index].text = text;

      this.handleSave(newNotes);

      return {
        notes: newNotes
      };
    });
  };

  handleReload = () => {
    this.setState({ isLoading: true, reloadHasError: false });
    NoteService.load()
      .then(notes => {
        this.setState({ notes, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false, reloadHasError: true });
      });
  };

  handleSave = notes => {
    this.setState({ isLoading: true, saveHasError: false });
    NoteService.save(notes)
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false, saveHasError: true });
      });
  };

  handleOpenMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  render() {
    const {
      notes,
      isLoading,
      reloadHasError,
      saveHasError,
      isMenuOpen
    } = this.state;

    return (
      <Router>
        <Fragment>
          <AppBar
            isLoading={isLoading}
            saveHasError={saveHasError}
            onSaveRetry={() => {
              this.handleSave(notes);
            }}
            onOpenMenu={this.handleOpenMenu}
          />
          <div className='container'>
            <Route
              path='/'
              exact
              render={props => (
                <Notes
                  notes={notes}
                  reloadHasError={reloadHasError}
                  onRetry={this.handleReload}
                  onAddNote={this.handleAddNote}
                  onMove={this.handleMove}
                  onDelete={this.handleDelete}
                  onEdit={this.handleEdit}
                />
              )}
            />
            <Route path='/about' exact component={About} />
          </div>
          <NavigationDrawer
            isOpen={isMenuOpen}
            onCloseMenu={this.handleCloseMenu}
          />
        </Fragment>
      </Router>
    );
  }
}

export default App;
