import './stylePagination.css'
import commonPropTypes from "../../modules/commonPropTypes"

const Pagination = (props) =>{
    return(
        <nav className='nav-pagination'>
            <ul>
            {Array.from(Array(props.pages), (item, index) => {
                return (
                    <li key={index}>
                        <button
                            style={index === props.currentPage ? {backgroundColor: "#1e2747", color: "#fff"} : {backgroundColor: "#fff", color: "#000"}}
                            className='button-pagination' 
                            value={index}
                            onClick={(event) => props.setCurrentPage(Number(event.target.value))}>{index + 1}
                        </button>
                    </li>
                    )
                })}
            </ul>
        </nav>
    )
}

Pagination.propTypes = commonPropTypes.paginationPropTypes  
export default Pagination
