import { useState, useEffect } from 'react'
import './styleHome.css'
import api from '../../services/api'
import Pagination from '../../components/pagination/pagination'
import ContentPage from '../../components/contentPage/ContentPage'
import Sidebar from '../../components/sidebar/Sidebar'
import InputSearches from '../../components/inputSearches/InputSearches'
import InputSearchHighlight from '../../components/searchHighlight/SearchHighlight'

const searchHistoryStorage = "searchHistory"
const paginationPerPage = 4

function Home() {
  const [findTerm, setFindTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searches, setSearches] = useState([])
  const [searchHistory, setSearchHistory] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  
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
  async function getSuggestions(queryLetters){
    try{
      if(!queryLetters.trim()) return
      const searchesFromApi = await api.get(`/search?q=${queryLetters}`)

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
  }
  const handleInputClickSuggetions = (suggestion) => {
    setSearchQuery(suggestion)
    setIsTyping(false)
    getSearches()
  }

  return (
    <div className='main-page'>
      <div>
        <InputSearchHighlight 
          currentSearchPage={currentSearchPage} 
          findTerm={findTerm}
          setFindTerm={setFindTerm}
        />

        <InputSearches 
          searchQuery={searchQuery}
          handleInputChangeSearch={handleInputChangeSearch} 
          getSearches={getSearches} 
          isTyping={isTyping} 
          suggestions={suggestions} 
          handleInputClickSuggetions={handleInputClickSuggetions}
        />
        
        <div className='search-contents'>
          <ContentPage currentSearchPage={currentSearchPage} findTerm={findTerm}>
            {<Pagination 
              pages={pages} 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage}
            />}
          </ContentPage>
          
          <Sidebar 
            searchHistory={searchHistory} 
            postSearches={postSearches}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
