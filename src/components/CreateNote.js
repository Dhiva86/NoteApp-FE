import React from 'react'

function CreateNote({newNoteContent, handleNoteChange, newNoteImportant, 
    handleSelectChange, addNote, newNoteContentRef}) {
    const textareaStyle ={
        height:'45px',
        width:'350px',
        lineHeight:'1',
        fontSize:'12px',
        padding:'8px'
    }

   
  return (
    <div>
        <h1>Create a new Note</h1>

        <form onSubmit={addNote}>
            <label htmlFor='inputNewNoteContent'>Content: </label>
            <textarea id='inputNewNoteContent' 
            placeholder='type new note...' 
            style={textareaStyle}
            onChange={handleNoteChange}
            value={newNoteContent}
            ref={newNoteContentRef}
            ></textarea>
        <br/><br/>
            <label htmlFor='selectImportant'>Select the Important: </label>
            <select id='selectImportant'
            onChange={handleSelectChange}
            value={newNoteImportant}
            >
                <option>--Select--</option>
                <option>Yes</option>
                <option>No</option>
            </select>
            <br/><br/>
            <button type='submit'>Add New Note</button>
        </form>
        </div>
  )
}

export default CreateNote