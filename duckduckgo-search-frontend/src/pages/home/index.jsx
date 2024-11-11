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
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  
  const pages = Math.ceil(searches.length / paginationPerPage)
  const startIndex = currentPage * paginationPerPage
  const endIndex = startIndex + paginationPerPage
  const currentSearchPage = searches.slice(startIndex, endIndex)

  const lowerCaseSearch = searchQuery.toLowerCase() 

  async function getSearches(){
    try{
      if(!searchQuery.trim()) return
      setIsTyping(false)
      const searchesFromApi = await api.get(`/search?q=${searchQuery}`)

      setSearches(searchesFromApi.data)
      if(searchesFromApi.data.length > 0){
        addSearch(searchQuery)           
      }
    } catch (error) {
      console.error("Something went wrong when making the GET request: ", error);
    }
  } 
  async function getSuggestions(letterByLetter){
    try{
      if(!letterByLetter.trim()) return
      const searchesFromApi = await api.get(`/search?q=${letterByLetter}`)

      const filteredSearchSuggestions = searchesFromApi.data
      .filter(item => item.title && item.title.toLowerCase()
      .startsWith(lowerCaseSearch)).map(item => item.title.split(" ")[0]); 

      setSuggestions(filteredSearchSuggestions)
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
    getSuggestions(event.target.value)
    setIsTyping(true)
    console.log("=== SEARCH QUERY: === " +event.target.value)
  }
  const handleInputClickSuggetions = (suggestion) => {
    setSearchQuery(suggestion)
    setIsTyping(false)
    getSearches()
  }

  return (
    <div className='main-page'>
      <div>
        <nav className='nav-input-searches'>
          <input className='input-search' type="text"
          placeholder='Search...'
          value={searchQuery}
          onChange={handleInputChangeSearch}
          onKeyDown={(e) => e.key === 'Enter' && getSearches()}
          />
          <button className='button-search' onClick={getSearches}>Search</button>
          {isTyping?
            (
              <div className='search-suggestions'>
                  <ul>
                {suggestions.map((suggestion, index) => (
                    <div key={index} onClick={() => handleInputClickSuggetions(suggestion)}>
                      <li>{suggestion}</li>
                    </div>
                  ))}
                </ul>
              </div>
            ): null}
        </nav>

        <div className='search-contents'>
          <SearchPage currentSearchPage={currentSearchPage}>
            {<Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
          </SearchPage>
          
          <Sidebar searchHistory={searchHistory} postSearches={postSearches}/>
        </div>
      </div>
    </div>
  )
}

export default Home
