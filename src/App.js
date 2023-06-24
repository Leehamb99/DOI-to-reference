import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const styles = ({

    italic: {fontStyle: 'italic'},
})
  const [reference, setReference] = useState({'page': "", 'name': "",'year': "",'title': "",'journal': "",'issue': ""})
  const [doi, setDoi] = useState("")
  const handleChange = (e) => {
    e.preventDefault()
    setDoi(e.target.value)
  }
  useEffect(() => {
    console.log("updated")
  }, [reference])

  const Search = () => {
    axios.get(`http://api.crossref.org/works/${doi}`)
    .then(function (response){
      let data = response.data.message
      console.log(data.title, data.volume, data.page, data.issue, data.author)
  

        setReference(reference => ({
          ...reference,
          'page': "pp. " + data.page,
          'name': data.author[0].family  + ", " + data.author[0].given + ".",
          'title': data.title,
          'journal': data['short-container-title'],
          'issue': data.volume + `(${data.issue})`,
          'year': data.created['date-parts'][0][0]
        }))

    })
  }

  return ( 
    <>
    <input name="firstName" onChange={handleChange} />

    <button onClick={Search}> Reference! </button>

    <div className='answer'> <text> {reference.name} ({reference.year}) '{reference.title}', </text> <text style={styles.italic}> {reference.journal}, </ text> <text> {reference.issue} {reference.page} </text></div>
    </>
  );


}

export default App;
