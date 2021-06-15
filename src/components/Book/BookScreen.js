import ky from 'ky-universal';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { showBookList, showBookListIDs } from '../../redux/actions';

import BookCard from './BookCard';

export default function BookScreen() {
    const dispatch = useDispatch();

    const bookIDs = useSelector(state => state.ui.books);
    const books = useSelector(state => bookIDs.map(id => state.models.books[id]));

    useEffect(() => {
        async function fetch() {
            const [books] = await Promise.all([
                ky.get('http://localhost:4000/book').json()
            ]);

            batch(() => {
                dispatch(
                    showBookList(books)
                );
                dispatch(
                    showBookListIDs(books.map(l => l.id).reverse())
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
                />    
            )}

        </div>
    )
}