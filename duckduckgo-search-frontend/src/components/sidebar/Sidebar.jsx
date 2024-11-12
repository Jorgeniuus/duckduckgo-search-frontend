import commonPropTypes from "../../modules/commonPropTypes"
import './styleSidebar.css'

export default function Sidebar(props){
    return(
        <aside className='side-history-bar'>
            <h2 className='search-history-title'>Search History</h2>
            {props.searchHistory.map((history, index) => ( 
                <div key={index} className='history-content' onClick={() => props.handlePostSearchesData(history)}>
                <h3>{history}</h3>
                </div>
            ))}
        </aside>
    )
}

Sidebar.propTypes = commonPropTypes.sidebarPropTypes