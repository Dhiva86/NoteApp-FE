import React from 'react'

function Note({note}) {
  return (
    <li key={note.id}>{note.content}</li>
  )
}

export default Note