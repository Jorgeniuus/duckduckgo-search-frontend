import { useState, useEffect } from 'react'
import api from '../../services/api'

import './styleHome.css'

function App() {
  let [search, setSearche] = useState('')
  let [searches, setSearches] = useState([])

    async function getSearches(){
      try{
        const searchesFromApi = await api.get(`/search?q=${search}`)
    
        setSearches(searchesFromApi.data)
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
    } 

    const handleInputChangeSearch = (e) => {
      setSearche(e.target.data)
    }

    // useEffect(() => {
    //   getSearches();
    //   console.log(searches); 
    // }, []);
  
    useEffect(() => {
      console.log(searches);
    }, [searches]);

  return (
    <div className='main-page'>
      <nav className='input-searches'>
        <input type="text"
        placeholder='Search...'
        value={search}
        onChange={handleInputChangeSearch}
        onKeyDown={(e) => e.key === 'Enter' && handleInputChangeSearch()}
        />
        <button onClick={getSearches}>Search</button>
      </nav>
      <div className='search-contents'>
        <section className='page-searches'>
          <div className='search-result'>
            <a href="https://www.google.com.br/" target='_blank'>
              <h3>Testando 1</h3>
            </a>
          </div>
          <div className='search-result'>
            <a href="https://www.google.com.br/" target='_blank'>
              <h3>Testando 2</h3>
            </a>
          </div>
          <div className='search-result'>
            <a href="https://www.google.com.br/" target='_blank'>
              <h3>Testando 3</h3>
            </a>
          </div>
          {/* {searches.map(searchResult =>(
            <div key={'1'}>
              <h3>{searchResult.Text}</h3>
              <a href={searchResult.FirstURL} target='_blank'>
                {searchResult.FirstURL}
              </a>
            </div>
          ))} */}
        </section>
        <aside className='side-history-bar'>
          <h2 className='search-history-text'>Search History</h2>
          <div className='history-result'>
            <a href="https://www.google.com.br/" target='_blank'>
              <h3>Testando 1</h3> 
            </a>
          </div>
          <div className='history-result'>
            <a href="https://www.google.com.br/" target='_blank'>
              <h3>Testando 1</h3> 
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default App
