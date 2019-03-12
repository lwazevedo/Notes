import React, { Component } from 'react';
import NotesContext from './NotesContext';
import NoteService from '../../services/NoteService';
import uuid from 'uuid/v1';
import XLSX from 'xlsx';

class NotesProvider extends Component {
  state = {
    notes: [],
    isLoading: false,
    reloadHasError: false,
    saveHasError: false,
    printExcelHasError: false
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

  handlePrintExcel = () => {
    this.setState({ isLoading: true, printExcelHasError: false });

    NoteService.printExcel()
      .then(notes => {
        this.setState({ isLoading: false });

        const ws = XLSX.utils.json_to_sheet(notes);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
        XLSX.writeFile(wb, 'SheetJS.xlsx');
      })
      .catch(() => {
        this.setState({ isLoading: false, printExcelHasError: true });
      });
  };

  render() {
    return (
      <NotesContext.Provider
        value={{
          ...this.state,
          onSaveRetry: () => {
            this.handleSave(this.state.notes);
          },
          onRetry: this.handleReload,
          onAddNote: this.handleAddNote,
          onMove: this.handleMove,
          onDelete: this.handleDelete,
          onEdit: this.handleEdit,
          onPrintExcel: this.handlePrintExcel
        }}
      >
        {this.props.children}
      </NotesContext.Provider>
    );
  }
}

export default NotesProvider;
