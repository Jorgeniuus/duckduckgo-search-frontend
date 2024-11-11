import PropTypes from 'prop-types'

const paginationPropTypes = {
    pages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired 
}
const currentSearchPagePropTypes = {
    currentSearchPage: PropTypes.array.isRequired 
}
const sidebar = {
    searchHistory: PropTypes.array.isRequired,
    postSearches: PropTypes.func.isRequired
}
const inputSearches = {
    searchQuery: PropTypes.string.isRequired,
    suggestions: PropTypes.array.isRequired,
    getSearches: PropTypes.func.isRequired,
    isTyping: PropTypes.bool.isRequired,
    handleInputChangeSearch: PropTypes.func.isRequired,
    handleInputClickSuggetions: PropTypes.func
}
const searchHighlight = {
    array: PropTypes.array,
    string: PropTypes.string, 
    func: PropTypes.func
}

export default {
    paginationPropTypes,
    currentSearchPagePropTypes,
    sidebar,
    inputSearches,
    searchHighlight
}