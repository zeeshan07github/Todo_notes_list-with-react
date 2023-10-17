import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import arrowLeft from '../assets/arrow-left.svg';

const Notepage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    if (id !== 'new') {
      getNote();
    }
  }, [id]);

  const getNote = async () => {
    const response = await fetch(`http://localhost:8000/notes/${id}`);
    const data = await response.json();
    setNote(data);
  };

  const editNote = (updatedNote) => {
    setNote(updatedNote);
  };

  const saveNote = async () => {
    if (id === 'new') {
      await createNote();
    } else {
      await updateNote();
    }
  };

  const createNote = async () => {
    // Make an API call to create a new note
    const response = await fetch('http://localhost:8000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body: note.body, created: new Date(), updated: new Date() }),
    });

    if (response.status === 201) {
      // Successfully created, get the new note's ID from the response
      const location = response.headers.get('Location');
      const newNoteId = location.split('/').pop();

      // Redirect to the newly created note's page
      window.location.href = '/';
    } else {
      // Handle the error
      console.error('Failed to create the note.');
    }
  };

  const updateNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
    window.location.href = '/';
  };

  const deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });

    // Redirect back to the main page after deleting the note
    window.location.href = '/';
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <img src={arrowLeft} alt="Go Back" onClick={saveNote} />
          </Link>
        </h3>
        {id !== 'new' && (
          <button onClick={deleteNote}>Delete</button>
        )}
        {id !== 'new' && note && ( // Only render the Save button when editing an existing note
          <button onClick={saveNote}>Save</button>
        )}
        {id === 'new' && note && ( // Only render the Create button when creating a new note with content
          <button onClick={saveNote}>Create</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          editNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default Notepage;
