import commonPropTypes from "../../modules/commonPropTypes"

const SearchPage = (props) =>{
    return(
        <section className='page-searches'>
        {props.currentSearchPage.map((searchResult, index) =>(
          <div key={index} className='search-result'>
            <a href={searchResult.url} target='_blank'>
              <h3>{searchResult.title}</h3>
            </a>
          </div>
        ))}
        {props.children}
    </section>
    )
}

SearchPage.propTypes = commonPropTypes.currentSearchPagePropTypes  
export default SearchPage