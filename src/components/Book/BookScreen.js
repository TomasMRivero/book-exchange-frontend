import ky from 'ky-universal';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { showBookList, showBookListIDs, showUserList, showUserListIDs } from '../../redux/actions';

import BookCard from './BookCard';

export default function BookScreen() {
    const dispatch = useDispatch();

    const bookIDs = useSelector(state => state.ui.books);
    const books = useSelector(state => bookIDs.map(id => state.models.books[id]));

    const userIDs = useSelector(state => state.ui.users);
    const users = useSelector(state => userIDs.map(id => state.models.users[id]));

    useEffect(() => {
        async function fetch() {
            const [books, users] = await Promise.all([
                ky.get('http://localhost:4000/book').json(),
                ky.get('http://localhost:4000/user').json()
            ]);

            batch(() => {
                dispatch(
                    showBookList(books)
                );
                dispatch(
                    showBookListIDs(books.map(b => b.id).reverse())
                );
                dispatch(
                    showUserList(users)
                );
                dispatch(
                    showUserListIDs(users.map(u => u.id).reverse())
                );
            });
            
        }

        fetch();
    }, [dispatch]);

    return (
        <div className="BookScreen">
            <div className="section-header">
                <h1>LIBROS</h1>
                <h5>Lista de libros</h5>
            </div>

            {books.map(book =>
                <BookCard
                    key = {book.id}
                    book = {book}
                    owner = {users[book.user_account_id]}
                />    
            )}

        </div>
    )
}