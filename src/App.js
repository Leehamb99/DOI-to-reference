import axios from 'axios';
import { useState, useEffect, Component } from 'react';
import {Form } from './Components/index.js';

let authors = ""
function App() {

  const [reference, setReference] = useState("")
  const [doi, setDoi] = useState("")
  const handleChange = (e) => {
    e.preventDefault()
    setDoi(e.target.value)
  }
  useEffect(() => {
    console.log("updated")
  }, [reference])

  



  const Search = async () => {
    const response = await axios.get(`https://doi.org/${doi}`, {
      headers: {
        'Accept': 'text/x-bibliography; style=harvard-cite-them-right-no-et-al'
      }
    });
      console.log(response.data)
      setReference(response.data)


  


    }
  

  return ( 
    <>
    <input name="firstName" onChange={handleChange} />

    <button onClick={Search}> Reference! </button>

    <div className='answer'> <text> {reference} </text></div>
    </>
  );


}

export default App;
