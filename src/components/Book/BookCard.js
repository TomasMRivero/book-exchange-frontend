import { useCallback } from "react";
import { useHistory } from "react-router";

export default function BookCard({
    book
}){
    const history = useHistory();
    const onClickBook = useCallback((e) => {
        e.preventDefault();
        history.push(`/book/${book.id}`)
    }, [history, book]);
    return(
        <div onClick={onClickBook} style={{cursor:'pointer'}} className = "card">
            <h3>{book.title}</h3>
            <h6>{book.author}</h6>
        </div>
    )
}