import axios from 'axios'
import React, { useState } from 'react'

function EditNotes({notes}) {
    const [showForm, setShowForm] = useState(false)
    const [updateNoteContent, setUpdateNoteContent]=('')
    const [updateNoteImportant, setUpdateNoteImportant] =useState(false)
    const [ID, setID] = useState('');

    const editNoteHandler = (id)=>{
        setShowForm(true)
        setID(id)
 //fetch details of the note
        axios
        .get(`https://noteapp-be-hhyu.onrender.com/api/notes/${id}`)
        .then(note =>{
            setUpdateNoteContent(note.data.content)
            setUpdateNoteImportant(note.data.important ? "Yes": "No")
        }

        )
    }
    const updateNote = (e)=>{
        e.preventDefault()
        const noteToPut = {
            content: updateNoteContent,
            important: updateNoteImportant
        };

        console.log(noteToPut, ID);

        axios.put(`https://noteapp-be.onrender.com/api/notes/${ID}`, noteToPut)
            .then((response) => console.log('note updated'))
        
        setShowForm(false);
     
    }

    const textareaStyle ={
        height:'45px',
        width:'350px',
        lineHeight:'1',
        fontSize:'12px',
        padding:'8px'
    }
  return (
    <div>
        <h1>EditNotes</h1>

        <ul>
              {
                  notes.map(note => 
                      <li key={note.id}>
                          {note.content}
                          <button onClick={() => editNoteHandler(note.id)}>Edit</button>
                      </li>
                  )
              }
          </ul>

        {
            showForm&&
            <div>

<form onSubmit={updateNote}>
            <label htmlFor='inputNewNoteContent'>Content: </label>
            <textarea id='inputNewNoteContent' 
            placeholder='type new note...' 
            style={textareaStyle}
            onChange={(e)=>setUpdateNoteContent(e.target.value)}
            value={updateNoteContent}
            
            ></textarea>
        <br/><br/>
            <label htmlFor='selectImportant'>Select the Important: </label>
            <select id='selectImportant'
            onChange={(e)=>setUpdateNoteImportant(e.target.value)}
            value={updateNoteImportant}
            >
                <option>--Select--</option>
                <option>Yes</option>
                <option>No</option>
            </select>
            <br/><br/>
            <button type='submit'>Update Note</button>
        </form>
            </div>
        }
    </div>
  )
}

export default EditNotes