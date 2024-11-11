import './styleInputSearches.css'
import commonPropTypes from '../../modules/commonPropTypes'

export default function InputSearches(props){
    return(
        <nav className='nav-input-searches'>
            <input className='input-search' type="text"
                placeholder='Search...'
                value={props.searchQuery}
                onChange={props.handleInputChangeSearch}
                onKeyDown={(e) => e.key === 'Enter' && props.getSearches()}
            />
            <button className='button-search' onClick={props.getSearches}>Search</button>
            {props.isTyping?
            (
                <div className='search-suggestions'>
                    <ul>
                        {props.suggestions.map((suggestion, index) => (
                            <div key={index} onClick={() => props.handleInputClickSuggetions(suggestion)}>
                                <li>{suggestion}</li>
                            </div>
                        ))}
                    </ul>
                </div>
            ): null}
        </nav>
    )
}

InputSearches.propTypes = commonPropTypes.inputSearchesPropTypes  