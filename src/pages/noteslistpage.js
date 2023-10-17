import React, { useEffect, useState } from 'react';
import notes from '../assets/data';
import ListItem from '../components/listitem';
import createnote from "../pages/notepage";
import AddButton from "../components/addbtn";

const Noteslistpage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    getnotes()
  } , [] )

  let getnotes = async() => {
    let response = await  fetch('http://localhost:8000/notes')
    let data = await response.json()
    setNotes(data)
  } 

    return (
      <div className='notes'>
        <div className="notes-header">
          <h2 className="notes-title">&#9782; Notes</h2>
          <p className="notes-count">{notes.length}</p>
        </div>
        <div className="notes-list">
          {notes.map((note, index) => (
            <ListItem key={index} note={note} /> 
          ))}
        </div>
        <AddButton/>
      </div>
    );
  };
  
  export default Noteslistpage;