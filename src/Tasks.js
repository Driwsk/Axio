import { wait } from "@testing-library/user-event/dist/utils";
import Api, { API_TASKS } from "./utils/Api";
import {useCallback, useEffect, useState} from 'react';

function Tasks() {

    const [ErrorMsg, setErrorMsg] = useState([null]);
    const [tasks, setAPI_TASKS] = useState([]);
  
    const getAPI_TASKS = useCallback( async () =>{
      const {data, error } = await Api.getAPI_TASKS('/tasks')
        
      if (error){
        setErrorMsg("Ocorreu um erro ao obter os personagens")
      }
      if (data?.results) {
          setAPI_TASKS(data.results)
      }
      },[])
  
      
  useEffect(()=>{

    getAPI_TASKS()
  },[getAPI_TASKS])
  return (

    <div className="tasks">
      {!!ErrorMsg && <div className='error-msg'>{ErrorMsg}</div>}
      {tasks.length > 0 && tasks.map((item) =>{
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

export default Tasks