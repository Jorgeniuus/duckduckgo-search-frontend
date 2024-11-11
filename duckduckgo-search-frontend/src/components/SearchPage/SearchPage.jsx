import commonPropTypes from "../../modules/commonPropTypes"
import './styleSearchPage.css'
import getHighlightedText from "../../modules/getHighlightedText"

const SearchPage = (props) =>{
    return(
      <section className='page-searches'>
        {props.currentSearchPage.map((searchResult, index) =>(
            <div key={index} className='search-result'>
              <a href={searchResult.url} target='_blank'>
                  <h1>{getHighlightedText(searchResult.title ? searchResult.title : '', props.findTerm)}</h1>
              </a>
            </div>
        ))}

        {props.children}
    </section>
    )
}

SearchPage.propTypes = commonPropTypes.currentSearchPagePropTypes  
export default SearchPage