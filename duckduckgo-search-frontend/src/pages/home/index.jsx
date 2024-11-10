import { useState, useEffect } from 'react'
import './styleHome.css'
import api from '../../services/api'
import Pagination from '../../components/pagination/pagination'
import SearchPage from '../../components/searchPage/SearchPage'
import Sidebar from '../../components/sidebar/Sidebar'

const searchHistoryStorage = "searchHistory"
const paginationPerPage = 4

function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searches, setSearches] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [searchHistory, setSearchHistory] = useState([])
  
  const pages = Math.ceil(searches.length / paginationPerPage)
  const startIndex = currentPage * paginationPerPage
  const endIndex = startIndex + paginationPerPage
  const currentSearchPage = searches.slice(startIndex, endIndex)

  async function getSearches(){
    try{
      if(!searchQuery.trim()) return
      const encodedSearch = encodeURIComponent(searchQuery);
      const searchesFromApi = await api.get(`/search?q=${encodedSearch}`)

      setSearches(searchesFromApi.data)

      if(searchesFromApi.data.length > 0){
        addSearch(searchQuery)           
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

  const addSearch = (newSearch) => {
    const updatedHistory = [newSearch, ...searchHistory];

    if (updatedHistory.length > 6) {
      updatedHistory.pop();  
    }
    setSearchHistory(updatedHistory);
    localStorage.setItem(searchHistoryStorage, JSON.stringify(updatedHistory));
  };

  useEffect(() => {
    setCurrentPage(0)
  }, [searches])

  useEffect(() => {
    const getSearchHistory = localStorage.getItem(searchHistoryStorage)
    if(getSearchHistory){
      setSearchHistory(JSON.parse(getSearchHistory))
    }
  }, [])

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
        
        <Sidebar searchHistory={searchHistory} postSearches={postSearches}/>
      </div>
    </div>
  )
}

export default Home
