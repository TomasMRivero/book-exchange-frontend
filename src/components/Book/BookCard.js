import { useSelector } from "react-redux"

export default function BookCard({
    book
}){
    const owner = useSelector(state => state.models.users[book.user_account_id].alias);
    return(
        <div className = "card">
            <h2>{book.title}</h2>
            <h3>Autor: {book.author}</h3>
            <h5>Dueño: {owner}</h5>
            <p>{book.description}</p>
        </div>
    )
}