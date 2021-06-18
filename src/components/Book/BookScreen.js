import ky from "ky-universal";
import { useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { showBook, showUser, showBookList, showBookListIDs, showUserList, showUserListIDs } from "../../redux/actions";

import SearchField from '../SearchField';
import BookCard from "./BookCard";

export default function BookScreen(){
    const dispatch = useDispatch();
    const bookID = Number(useParams().id)

    const book = useSelector(state => state.models.book);
    const user = useSelector(state => state.models.user);

    const bookIDs = useSelector(state => state.ui.books);
    const books = useSelector(state => bookIDs.map(id => state.models.books[id]));
    
    const userIDs = useSelector(state => state.ui.users);
    const users = useSelector(state => userIDs.map(id => state.models.users[id]));
    
    const[loaded, setLoaded] = useState(false)
    async function fetch() {
        try{
            const [book, books, users] = await Promise.all([
                ky.get(`http://localhost:4000/book/${bookID}`).json(),
                ky.get(`http://localhost:4000/book/`).json(),
                ky.get('http://localhost:4000/user').json()
            ]);

            
            batch(() => {
                (dispatch(showBook(book)));

                dispatch(showUser(users.find(u => u.id === book.user_account_id)));

                dispatch(showBookList(books));
                dispatch(showBookListIDs(books.filter(b => b.user_account_id === book.user_account_id && b.id !== bookID).map(b => b.id).reverse()));

                dispatch(showUserList(users));
                dispatch(showUserListIDs(users.map(u => u.id).reverse()));

                setLoaded(true);
            });
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        
        fetch()
        console.log("fetched");
        return function cleanup() {
            console.log("limpiando")
        };
    }, [bookID, dispatch]);

    console.log(book);
    console.log(books);
    console.log(user);

    return (

        <div className="BookScreen">
            <SearchField />
            <div className="book">
                <h1>{book.title}</h1>
                <p>imagen</p>
                <p><strong>Autor: </strong>{book.author}</p>
                <div className="description-field">
                <p>{book.description?<strong>Descripción:</strong>:<i>No hay descripción</i>}</p>
                <p>{book.description}</p>
                </div>
                <br/>
                <p>otros libros de <strong>{user.alias}</strong></p>
            </div>
            {loaded && books.map(book =>
                <BookCard
                    key = {book.id}
                    book = {book}
                />
            )}
        </div>

    )
};