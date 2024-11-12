import commonPropTypes from "../../modules/commonPropTypes"
import { useEffect, useRef, useState } from 'react'
import './styleSearchHighlight.css'

const countOccurences = (text, query) => {
    if(!query) return 0
    const regExp = new RegExp(query, 'gi')
    const matches = text.match(regExp)
    return matches ? matches.length : 0
}

function InputSearchHighlight(props){
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const inputRef = useRef(null)

    const handleKeyDown = (event) => {
        if(event.ctrlKey && event.key === 'f'){
            event.preventDefault()
            setIsSearchVisible(true)
        } 
        
        if(event.key === 'Escape'){
            setIsSearchVisible(false)
            props.setFindTerm('')
        }
    }  

    useEffect(() =>{
        if(isSearchVisible && inputRef.current){
            inputRef.current.focus()
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };

    }, [isSearchVisible])

    const handleInputChangeFind = (event) => {
        props.setFindTerm(event.target.value)
    }

    return(
        <div className='input-highlight'>
            {isSearchVisible && ( 
                <div>
                    <input
                        className="input_find"
                        ref={inputRef}
                        type="text"
                        placeholder="Find..."
                        value={props.findTerm}
                        onChange={handleInputChangeFind}
                    />
               
                    <span className='occurence-count'>
                        {
                            "Found: "+props.currentSearchPage.reduce((total, searchResult) =>{
                                return total + countOccurences(searchResult.title ? searchResult.title : '', props.findTerm)
                            }, 0)
                        }
                    </span>
                </div>
            )} 
        </div>
    )
}

InputSearchHighlight.propTypes = commonPropTypes.searchHighlightPropTypes  
export default InputSearchHighlight