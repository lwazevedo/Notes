import React, { Fragment } from 'react';
import Error from '../components/Error/Error';
import NewNote from '../components/NewNote/NewNote';
import NoteList from '../components/NoteList/NoteList';

const Notes = ({
  notes,
  reloadHasError,
  onRetry,
  onAddNote,
  onMove,
  onDelete,
  onEdit
}) => {
  if (reloadHasError) {
    return <Error onRetry={onRetry} />;
  }

  return (
    <Fragment>
      <NewNote onAddNote={onAddNote} />
      <NoteList
        notes={notes}
        onMove={onMove}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </Fragment>
  );
};

export default Notes;
