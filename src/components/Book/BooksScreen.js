import axios from "axios";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { showBookList, showBookListIDs, showUserList, showUserListIDs } from '../../redux/actions';



import BookItem from './BookItem';

export default function BooksScreen() {
    const dispatch = useDispatch();

    const bookIDs = useSelector(state => state.ui.books);
    const books = useSelector(state => bookIDs.map(id => state.models.books[id]));

    const userIDs = useSelector(state => state.ui.users);
    const users = useSelector(state => userIDs.map(id => state.models.users[id]));
    
    const[loaded, setLoaded] = useState(false)

    async function fetch() {
        async function getBooks(){
            return await axios.get('http://localhost:4000/book');
        }

        async function getUsers(){
            return await axios.get('http://localhost:4000/user');
        }

        Promise.all([getBooks(), getUsers()])
            .then(results => {
                const books = results[0];
                const users = results[1];
                
                batch(() => {
                    dispatch(
                        showBookList(books.data)
                    );
                    dispatch(
                        showBookListIDs(books.data.map(b => b.id).reverse())
                    );
                    dispatch(
                        showUserList(users.data)
                    );
                    dispatch(
                        showUserListIDs(users.data.map(u => u.id).reverse())
                    );
                });
                setLoaded(true);
                
            }).catch(error => {
                if (error.response){
                    console.error(error.response);
                }
            });            
    }

    useEffect(() => {
        fetch();
        return function cleanup() {
            console.log("limpiando")
        };
    }, [dispatch]);

    return (

        <div className="BooksScreen">
            <div className="section-header">
                <h1>LIBROS</h1>
                <h5>Lista de libros</h5>
            </div>

            {loaded && books.map(book =>
                <BookItem
                    key = {book.id}
                    book = {book}
                    owner = {users[book.user_account_id]}
                />
            )}

        </div>
    )
}