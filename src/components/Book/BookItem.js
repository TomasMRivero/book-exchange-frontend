import { useCallback } from "react";
import { useSelector } from "react-redux"
import { useHistory } from "react-router";

export default function BookItem({
    book
}){
    const history = useHistory();
    const owner = useSelector(state => state.models.users[book.user_account_id]);
    const onClickBook = useCallback((e) => {
        e.preventDefault();
        history.push(`/book/${book.id}`)
    }, [history, book]);
    const onClickUser = useCallback((e) => {
        e.preventDefault();
        history.push(`/user/${owner.id}`)
    }, [history, owner.id]);
    return(
        <div className = "item">
            <h2 onClick={onClickBook} style={{cursor:'pointer'}}>{book.title}</h2>
            <h3>Autor: {book.author}</h3>
            <h5 onClick={onClickUser} style={{cursor:'pointer'}}>Dueño: {owner.alias}</h5>
            <p>{book.description}</p>
        </div>
    )
}