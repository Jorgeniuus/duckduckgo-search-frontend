export default function getHighlightedText(text, query){
    if(!query) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, index) => part.toLowerCase() === query.toLowerCase() ? (
        <span className="span-highlight" key={index}>
            {part}
        </span>
    ) : (
        part
    ))
}