import ky from "ky";
import { useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { showBookList, showBookListIDs, showUser, showUserList, showUserListIDs } from "../../redux/actions";

import BookCard from "../Book/BookCard";
import SearchField from "../SearchField";

export default function UserScreen(){
    const dispatch =  useDispatch();
    const userID = Number(useParams().id);

    const user = useSelector(state => state.models.user);

    const bookIDs = useSelector(state => state.ui.books);
    const books = useSelector(state => bookIDs.map(id => state.models.books[id]));

    const[loaded, setLoaded] = useState('false');
    async function fetch() {
        try {
            const [ user, books] = await Promise.all([
                ky.get(`http://localhost:4000/user/${userID}`).json(),
                ky.get(`http://localhost:4000/book/search/user_account_id?q=${userID}`).json(),
            ]);

            batch(() => {
                dispatch(showUser(user));

                dispatch(showBookList(books));
                dispatch(showBookListIDs(books.map(b => b.id).reverse()));

                dispatch(showUserList([user]));
                dispatch(showUserListIDs([userID]));

                setLoaded(true);
            });

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        fetch();
        return function cleanup() {
            return ky.stop;
        };

    }, [userID, dispatch]);

    return(
        <div className = "UserScreen">
            <div className="user-data">
                <h2><strong>{user.name}</strong></h2>
                <h4>@{user.alias}</h4>
                <span>{books.length} Libros publicados</span>
            </div>
            {loaded && books.map(book=>
                <BookCard
                    key = {book.id}
                    book = {book}
                />
            )}
        </div>
    )
}