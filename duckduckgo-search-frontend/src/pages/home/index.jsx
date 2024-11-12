import { getSearchesData , postSearchesData, getSuggestionsData } from '../../services/duckDuckGoAPI'
import { useState, useEffect } from 'react'
import './styleHome.css'
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

  const lowerCaseSearchQuery = searchQuery.toLowerCase() 

  const addToSearchHistory = (newSearch) => {
    if(searchHistory.includes(newSearch)){
      const index = searchHistory.indexOf(newSearch)
      searchHistory.splice(index, 1)
    }

    const updatedHistory = [newSearch, ...searchHistory];

    if (updatedHistory.length > 6) {
      updatedHistory.pop();  
    }
    setSearchHistory(updatedHistory);
    localStorage.setItem(searchHistoryStorage, JSON.stringify(updatedHistory));
  };
  
  useEffect(() => {
    if(searchQuery.length <= 0){
      setIsTyping(false)
    }
  }, [searchQuery])

  useEffect(() => {
    if(searches.length > 0){
      addToSearchHistory(searchQuery)           
    }
    setIsTyping(false)
    setCurrentPage(0)
  }, [searches])

  useEffect(() => {
    const getSearchHistory = localStorage.getItem(searchHistoryStorage)

    if(getSearchHistory){
      setSearchHistory(JSON.parse(getSearchHistory))
    }
  }, [])

  const handleInputChangeSearch = (event) => {
    let partialQuery = event.target.value
    setSearchQuery(partialQuery)
    getSuggestionsData(partialQuery, setSuggestions, lowerCaseSearchQuery)
    setIsTyping(true)
  }
  const handleInputClickSuggetions = (suggestion) => {
    setSearchQuery(suggestion)
    setIsTyping(false)
    getSearchesData(searchQuery, setSearches)
  }
  
  const handleGetSearchesData = () => {
    getSearchesData(searchQuery, setSearches)
  }

  const handlePostSearchesData = (searchHistory) => {
    setSearchQuery(searchHistory)
    postSearchesData(searchHistory, setSearches)
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
          handleGetSearches={handleGetSearchesData} 
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
            handlePostSearchesData={handlePostSearchesData}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
