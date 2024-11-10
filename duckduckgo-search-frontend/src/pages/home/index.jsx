import { useState, useEffect } from 'react'
import './styleHome.css'
import api from '../../services/api'
import Pagination from '../../components/pagination/pagination'
import SearchPage from '../../components/SearchPage/SearchPage'

function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searches, setSearches] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [searchHistory, setSearchHistory] = useState([])
  
  const searchHistoryStorage = "searchHistory"
  const paginationPerPage = 4
  const pages = Math.ceil(searches.length / paginationPerPage)
  const startIndex = currentPage * paginationPerPage
  const endIndex = startIndex + paginationPerPage
  const currentSearchPage = searches.slice(startIndex, endIndex)

  async function getSearches(){
    try{
      if(!searchQuery.length > 0 || searchQuery.trim() === "" ) return
      const encodedSearch = encodeURIComponent(searchQuery);
      const searchesFromApi = await api.get(`/search?q=${encodedSearch}`)

      setSearches(searchesFromApi.data)
      if(searchesFromApi.data.length > 0){
        setTimeout(() => {
          addSearch(searchQuery)           
        }, 2000)

        const addSearch = (newSearch) => {
          const updatedHistory = [newSearch, ...searchHistory];

          if (updatedHistory.length > 6) {
            updatedHistory.pop();  
          }
          setSearchHistory(updatedHistory);
          localStorage.setItem(searchHistoryStorage, JSON.stringify(updatedHistory));
        };

      }
    } catch (error) {
      console.error("Something went wrong when making the GET request: ", error);
    }
  } 
  async function postSearches(historyItem) {
    try {
        const response = await api.post('/search', {
        query: historyItem,
      });
      setSearches(response.data); 
    } catch (error) {
      console.error("Something went wrong when making the POST request: ", error);
    }
  }

  useEffect(() => {
    setCurrentPage(0)
    const getSearchHistory = localStorage.getItem(searchHistoryStorage)
    if(getSearchHistory){
      setSearchHistory(JSON.parse(getSearchHistory))
    }
  }, [searches])

  const handleInputChangeSearch = (event) => {
    setSearchQuery(event.target.value)
    console.log("=== SEARCH QUERY: === " +event.target.value)
  }

  return (
    <div className='main-page'>
      <nav className='nav-input-searches'>
        <input type="text"
        placeholder='Search...'
        value={searchQuery}
        onChange={handleInputChangeSearch}
        onKeyDown={(e) => e.key === 'Enter' && getSearches()}
        />
        <button className='button-search' onClick={getSearches}>Search</button>
      </nav>

      <div className='search-contents'>
        <SearchPage currentSearchPage={currentSearchPage}>
          {<Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
        </SearchPage>

        <aside className='side-history-bar'>
          <h2 className='search-history-title'>Search History</h2>
            {searchHistory.map((history, index) => ( 
              <div key={index} className='history-content' onClick={() => postSearches(history)}>
                <h3>{history}</h3>
              </div>
            ))}
        </aside>
      </div>
    </div>
  )
}

export default Home
