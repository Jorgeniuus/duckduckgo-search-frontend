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
export default {
    paginationPropTypes,
    currentSearchPagePropTypes,
    sidebar
}