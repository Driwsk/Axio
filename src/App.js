import './App.css';
import {useCallback, useEffect, useState} from 'react';
import API from './utils/Api'

function App() { 


  const [ErrorMsg, setErrorMsg] = useState([null]);
  const [character, setCharacters] = useState([]);

  const getCharacter = useCallback( async () =>{
    const {data, error } = await API.get('/character')

    if (error){
      setErrorMsg("Ocorreu um erro ao obter os personagens")
    }
    if (data?.results) {
        setCharacters(data.results)
    }
    },[])

    

  useEffect(()=>{

    getCharacter()
  },[getCharacter])
  return (

    <div className="App">
      {!!ErrorMsg && <div className='error-msg'>{ErrorMsg}</div>}
      {character.length > 0 && character.map((item) =>{
      return(
        <div className='card'>
          {!!item?.image && <img src={item.image}/>}
          <h3>{item.name}</h3>
        </div>
      )
      })}
    </div>
  );
}

export default App;
