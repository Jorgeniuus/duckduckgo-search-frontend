import axios from 'axios'

const duckDuckGoAPI = axios.create({
    baseURL: 'http://localhost:3000'
})

async function getSearchesData(searchQuery, setSearches){
    try{
      if(!searchQuery.trim()) return
      const searchesFromApi = await duckDuckGoAPI.get(`/search?q=${searchQuery}`)

      setSearches(searchesFromApi.data)
    } catch (error) {
      console.error("Something went wrong when making the GET request: ", error);
    }
  } 

  async function getSuggestionsData(partialQuery, setSuggestions, lowerCaseSearchQuery){
    try{
      if(!partialQuery.trim()) return
      const searchesFromApi = await duckDuckGoAPI.get(`/suggestion?q=${partialQuery}`)
      
      const filteredSearchSuggestions = searchesFromApi.data
      .filter(item => item.suggestion && item.suggestion.toLowerCase()
      .startsWith(lowerCaseSearchQuery)).map(item => item.suggestion) 

      setSuggestions(filteredSearchSuggestions)
    } catch (error) {
      console.error("Something went wrong when making the GET request: ", error);
    }
  } 

  async function postSearchesData(historyItem, setSearches) {
    try {
        const response = await duckDuckGoAPI.post('/search', {
        query: historyItem,
      });
      setSearches(response.data); 
    } catch (error) {
      console.error("Something went wrong when making the POST request: ", error);
    }
  }

export {
  getSearchesData,
  getSuggestionsData, 
  postSearchesData
}