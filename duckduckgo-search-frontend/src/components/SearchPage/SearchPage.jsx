import commonPropTypes from "../../modules/commonPropTypes"
import './styleSearchPage.css'

const SearchPage = (props) =>{
    return(
        <section className='page-searches'>
        {props.currentSearchPage.map((searchResult, index) =>(
          <div key={index} className='search-result'>
            <a href={searchResult.url} target='_blank'>
              <h2>{searchResult.title}</h2>
            </a>
          </div>
        ))}
        {props.children}
    </section>
    )
}

SearchPage.propTypes = commonPropTypes.currentSearchPagePropTypes  
export default SearchPage