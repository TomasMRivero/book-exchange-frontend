import { useCallback } from "react";
import { useSelector } from "react-redux"
import { useHistory } from "react-router";

export default function BookCard({
    book
}){
    const history = useHistory();
    const owner = useSelector(state => state.models.users[book.user_account_id].alias);
    const onClickBook = useCallback((e) => {
        e.preventDefault();
        history.push(`/book/${book.id}`)
    }, [history, book]);
    return(
        <div className = "card">
            <h2 onClick={onClickBook} style={{cursor:'pointer'}}>{book.title}</h2>
            <h3>Autor: {book.author}</h3>
            <h5>Dueño: {owner}</h5>
            <p>{book.description}</p>
        </div>
    )
}