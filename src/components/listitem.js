import React from 'react';
import { Link } from "react-router-dom";

let getTime = (note) => {
  return new Date(note.updated).toLocaleDateString()
}
let gettitle = (note) => {
  const get = note.body.split('\n')[0] 
  if (get.length > 40) {
    return get.slice(0,45)
  }
  return get
}

let get_content = (note) => {
  let title = gettitle(note)
  let content = note.body.replaceAll('\n' , ' ')
  content = content.replaceAll(title , '')
  if (content.length >30) {
    return content.slice(0 , 30)
  } 
  else {
    return content
  }
}
const ListItem = ({ note }) => {
  return (
    <div className='notes-list-item'>
      <Link to={`/note/${note.id}`}> 
        <h3> {gettitle(note)} </h3>
        <p>
          <p><span>{getTime(note)} </span>   {get_content(note)}</p>
        </p>
      </Link>
    </div>
  );
}

export default ListItem;
