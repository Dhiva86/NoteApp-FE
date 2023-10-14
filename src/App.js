import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ReadNotes from './components/ReadNotes';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import CreateNote from './components/CreateNote';
import EditNotes from './components/EditNotes';

function App() {
  const [notes, setNotes] = useState([])
  const[newNoteContent, setNewNoteContent ] = useState('')
  const [newNoteImportant, setNewNoteImportant] = useState('--Select--')
  const [showStatus,setShowStatus]=useState('all')

   const fetchAllNotes = async ()=>{
    await axios
    .get('https://noteapp-be-hhyu.onrender.com/api/notes')
    .then(response => setNotes(response.data))
   }

  useEffect (()=>{
       fetchAllNotes()
  },[])

  const newNoteContentRef = useRef(null)

  const padding ={ 
    padding:15
  }

  const handleNoteChange = (e)=>{
    setNewNoteContent(e.target.value)
  }
  const handleSelectChange=(e)=>{
    setNewNoteImportant(e.target.value)

  }

  const addNote = (e)=>{
    e.preventDefault();
    //prepare a new objet

    let noteObject = {
        content:newNoteContent,
        important:newNoteImportant==='Yes',
    }

    //make an api call and push the data to the database
    axios
    .post('https://noteapp-be-hhyu.onrender.com/api/notes', noteObject)
    .then(response =>console.log('note created'))
    setNewNoteContent('')
    setNewNoteImportant('--Select--')
    newNoteContentRef.current.focus()

}
  return (
    <Router>
    <div>
      <Link to = "/" style={padding}>Home</Link>
      <Link to="/readNotes" style={{paddingLeft:15} }>Read Notes</Link>
      <Link to="/createNotes" style={{padding:15}}>Created Notes</Link>
      <Link to="/EditNotes" style={{padding:15}}>Edit Notes</Link>
    </div>

    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/readNotes' element={<ReadNotes notes ={notes} showStatus={showStatus} 
      setShowStatus={setShowStatus}
      />}></Route>
      <Route path='/createNotes' element={<CreateNote newNoteContent = {newNoteContent} 
      handleNoteChange={handleNoteChange}
      newNoteImportant={newNoteImportant}
      handleSelectChange={handleSelectChange}
      addNote={addNote}
      newNoteContentRef={newNoteContentRef}
      />}></Route>
      <Route path='/editNotes' element={<EditNotes/>}></Route>
    </Routes>
    </Router>
  );
}

export default App;
