import { useState, useEffect } from 'react'
import api from '../../services/api'

import './styleHome.css'

function Home() {
  let [search, setSearch] = useState('')
  let [searches, setSearches] = useState([])

    async function getSearches(){
      try{
        const encodedSearch = encodeURIComponent(search);
        const searchesFromApi = await api.get(`/search?q=${encodedSearch}`)

        const validValues = []
        searchesFromApi.data.forEach(item => {
          if (item.title && item.title.length > 0) { 
            validValues.push(item); 
          }
        });

        setSearches(validValues)
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
    } 

    const handleInputChangeSearch = (event) => {
      setSearch(event.target.value)
      console.log("=== QUERY DA PESQUISA: === " +event.target.value)
    }

  return (
    <div className='main-page'>
      <nav className='input-searches'>
        <input type="text"
        placeholder='Search...'
        value={search}
        onChange={handleInputChangeSearch}
        onKeyDown={(e) => e.key === 'Enter' && getSearches()}
        />
        <button onClick={getSearches}>Search</button>
      </nav>

      <div className='search-contents'>

        <section className='page-searches'>
          {searches.map((searchResult, index) =>(
            <div key={index} className='search-result'>
              <a href={searchResult.url} target='_blank'>
                <h3>{searchResult.title}</h3>
              </a>
            </div>
          ))}
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

export default Home
