import { useState, useEffect } from 'react'
import './styleHome.css'
import api from '../../services/api'
import Pagination from '../../components/pagination/pagination'

function Home() {
  const [search, setSearch] = useState('')
  const [searches, setSearches] = useState([])

  const [paginationPerPage, setPaginationPerPage] = useState(4)
  const [currentPage, setCurrentPage] = useState(0)
  
  const pages = Math.ceil(searches.length / paginationPerPage)
  const startIndex = currentPage * paginationPerPage
  const endIndex = startIndex + paginationPerPage
  const currentPagesSearches = searches.slice(startIndex, endIndex)

  async function getSearches(){
    try{
      const encodedSearch = encodeURIComponent(search);
      const searchesFromApi = await api.get(`/search?q=${encodedSearch}`)

      // const validValues = searchesFromApi.data.filter(item => item.title && item.title.length > 0) 
      setSearches(searchesFromApi.data)
    } catch (error) {
      console.error("Something went wrong: ", error);
    }
  } 

  useEffect(() => {
    setCurrentPage(0)
  }, [searches])

  const handleInputChangeSearch = (event) => {
    setSearch(event.target.value)
    console.log("=== SEARCH QUERY: === " +event.target.value)
  }

  return (
    <div className='main-page'>
      <nav className='nav-input-searches'>
        <input type="text"
        placeholder='Search...'
        value={search}
        onChange={handleInputChangeSearch}
        onKeyDown={(e) => e.key === 'Enter' && getSearches()}
        />
        <button className='button-search' onClick={getSearches}>Search</button>
      </nav>

      <div className='search-contents'>

        <section className='page-searches'>
            {currentPagesSearches.map((searchResult, index) =>(
              <div key={index} className='search-result'>
                <a href={searchResult.url} target='_blank'>
                  <h3>{searchResult.title}</h3>
                </a>
              </div>
            ))}

          <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
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
