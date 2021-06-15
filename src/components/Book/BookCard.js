export default function BookCard({
    book
}){
    return(
        <div className = "card">
            <h2>{book.title}</h2>
            <h3>Autor: {book.author}</h3>
            <h5>Dueño: {book.user_account_id}</h5>
            <p>{book.description}</p>
        </div>
    )
}