import ky from "ky-universal";
import { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { showBook, showUserList, showUserListIDs } from "../../redux/actions";

import SearchField from '../SearchField';

export default function BookScreen(){
    const dispatch = useDispatch();
    const bookID = Number(useParams().id)

    const book = useSelector(state => state.models.book);

    const userIDs = useSelector(state => state.ui.books);
    const users = useSelector(state => userIDs.map(id => state.models.users[id]));

    useEffect(() => {
        async function fetch() {
            const [book, users] = await Promise.all([
                ky.get(`http://localhost:4000/book/${bookID}`).json(),
                ky.get('http://localhost:4000/user').json()
            ]);

            batch(() => {
                dispatch(showBook(book));
                dispatch(showUserList(users));
                dispatch(showUserListIDs(users.map(u => u.id).reverse()));
            });

        }
        fetch()
        console.log("fetched");
    }, []);
    console.log(book);
    return (

        <div className="BookScreen">
            <SearchField />
            <div className="book">
                <h1>{book.title}</h1>
                <p>imagen</p>
                <p><strong>Autor: </strong>{book.author}</p>
                <p><strong>Descripcion:</strong></p>
                <p>{book.description}</p>
                <br/>
                <p><strong>Dueño: </strong>{book.user_account_id}</p>                
            </div>
        </div>

    )
};