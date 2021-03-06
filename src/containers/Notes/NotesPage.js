import React, { Fragment } from 'react';

import { Error, NewNote, NoteList } from '../../components';
import whithNotes from '../../containers/Notes/withNotes';

const NotesPage = ({
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

export default whithNotes(NotesPage);
