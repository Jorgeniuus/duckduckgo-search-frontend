import commonPropTypes from "../../modules/commonPropTypes"

const PageSearches = (props) =>{
    return(
        <section className='page-searches'>
        {props.currentPagesSearches.map((searchResult, index) =>(
          <div key={index} className='search-result'>
            <a href={searchResult.url} target='_blank'>
              <h3>{searchResult.title}</h3>
            </a>
          </div>
        ))}

    </section>
    )
}

PageSearches.propTypes = commonPropTypes.currentPagesSearchesPropTypes  
export default PageSearches