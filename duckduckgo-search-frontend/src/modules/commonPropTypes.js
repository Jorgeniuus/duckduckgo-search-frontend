import PropTypes from 'prop-types'

const paginationPropTypes = {
    pages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired 
}
const currentSearchPagePropTypes = {
    currentSearchPage: PropTypes.array.isRequired 
}
const sidebarPropTypes = {
    searchHistory: PropTypes.array.isRequired,
    postSearches: PropTypes.func.isRequired
}
const inputSearchesPropTypes = {
    searchQuery: PropTypes.string.isRequired,
    suggestions: PropTypes.array.isRequired,
    getSearches: PropTypes.func.isRequired,
    isTyping: PropTypes.bool.isRequired,
    handleInputChangeSearch: PropTypes.func.isRequired,
    handleInputClickSuggetions: PropTypes.func
}
const searchHighlightPropTypes = {
    currentSearchPage: PropTypes.array,
    findTerm: PropTypes.string, 
    setFindTerm: PropTypes.func
}

export default {
    paginationPropTypes,
    currentSearchPagePropTypes,
    sidebarPropTypes,
    inputSearchesPropTypes,
    searchHighlightPropTypes
}