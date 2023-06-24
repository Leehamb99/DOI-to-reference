import axios from 'axios';
import { useState, useEffect } from 'react';

let authors = ""
function App() {

  const styles = ({

    italic: {fontStyle: 'italic'},
})
  const [name, setName] = useState("")
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
    axios.get(`https://api.crossref.org/works/${doi}`)
    .then(function (response){
      let data = response.data.message
      console.log(data.title, data.volume, data.page, data.issue, data.author)

      for (let i = 0; i < data.author.length; i++){
        if (i === 0){
          authors = data.author[i].family + ", " + data.author[i].given + "."
        }
        else if (i === data.author.length - 1){
          authors = authors + ', and ' + data.author[i].family + ", " + data.author[i].given + "."
        }
        else{
          authors = authors + ', ' + data.author[i].family + ", " + data.author[i].given + "."
        }
      }

  

        setReference(reference => ({
          ...reference,
          'page': "pp. " + data.page,
          'name': authors,
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
