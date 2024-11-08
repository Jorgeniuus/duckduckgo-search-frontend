import { useState, useEffect } from 'react'
import api from '../../services/api'

import './styleHome.css'

function App() {
  let [searches, setSearches] = useState()

    async function getSearches(){
      try{
        const searchesFromApi = await api.get('/search?q=casas')
    
        setSearches(searchesFromApi.data)
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
    } 

    useEffect(() => {
      getSearches();
      console.log(searches); 
    }, []);
  
    useEffect(() => {
      console.log(searches);
    }, [searches]);

  return (
    <div>

    </div>
  )
}

export default App
