import QueryString from "qs";
import ky from "ky";
import { useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { showBookList, showBookListIDs, showUserList, showUserListIDs } from "../../redux/actions";

import SearchField from "../SearchField";
import BookCard from './BookCard';

export default function BookSearchResults({location}){
    console.log("results")
    const dispatch = useDispatch();
    const value = QueryString.parse(location.search, { ignoreQueryPrefix: true, parameterLimit: 1 });
    const field = useParams().field
    
    const bookIDs = useSelector(state => state.ui.books);
    const books = useSelector(state => bookIDs.map(id => state.models.books[id]));

    const userIDs = useSelector(state => state.ui.users);
    const users = useSelector(state => userIDs.map(id => state.models.users[id]));

    const[loaded, setLoaded] = useState(false)

    async function fetch() {
        try{
            const [books, users] = await Promise.all([
                ky.get(`http://localhost:4000/book/search/${field}?q=${value.q}`).json(),
                ky.get('http://localhost:4000/user').json()
            ]);

            batch(() => {
                dispatch(
                    showBookListIDs(books.map(b => b.id).reverse())
                );
                dispatch(
                    showBookList(books)
                );
                dispatch(
                    showUserList(users)
                );
                dispatch(
                    showUserListIDs(users.map(u => u.id).reverse())
                );
            })

            setLoaded(true);
        }catch(err){
            console.log("error al conectarse al servidor");
        }
    }
    
    useEffect(() => {
        fetch();
        return function cleanup() {
            console.log("limpiando")
        };
    }, [location, dispatch]);
    

    console.log(books.length);
    console.log(loaded)
    function NoResult(){
        if(books.length > 0){
            return null;
        }
        return(
            <div>
                <p>No se hallaron resultados para {value.q}</p>
            </div>
        )
    }

    return(
        <div className="BookSearchResults">
            <div className="section-header">
                <h1>LIBROS</h1>
                <h5>Resultado de la búsqueda:</h5>
            </div>

            {loaded && books.map(book =>
                <BookCard
                    key = {book.id}
                    book = {book}
                    owner = {users[book.user_account_id]}
                />
            )}
            <NoResult/>

        </div>
    )
}