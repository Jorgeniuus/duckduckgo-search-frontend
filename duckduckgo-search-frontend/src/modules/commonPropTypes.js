import PropTypes from 'prop-types'

const paginationPropTypes = {
    pages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired 
}
const currentPagesSearchesPropTypes = {
    currentPagesSearches: PropTypes.array.isRequired 
}

export default {
    paginationPropTypes,
    currentPagesSearchesPropTypes
}