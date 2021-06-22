import ky from "ky-universal";
import { useCallback, useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { showBook, showUser, showBookList, showBookListIDs, showUserList, showUserListIDs } from "../../redux/actions";
import { makeStyles } from '@material-ui/core/styles';
import BookGrid from "./BookGrid";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        background: 'white',
        border: 0,
        borderRadius: 3,
        width: '90%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    }
  }));

export default function BookScreen(){
    const classes = useStyles();

    const dispatch = useDispatch();
    const bookID = Number(useParams().id);
    const history = useHistory();

    const book = useSelector(state => state.models.book);
    const user = useSelector(state => state.models.user);

    const bookIDs = useSelector(state => state.ui.books);
    const books = useSelector(state => bookIDs.map(id => state.models.books[id]));
    
    const userIDs = useSelector(state => state.ui.users);
    const users = useSelector(state => userIDs.map(id => state.models.users[id]));
    
    const[loaded, setLoaded] = useState(false);
    async function fetch() {
        try{
            const [book, books, users] = await Promise.all([
                ky.get(`http://localhost:4000/book/${bookID}`).json(),
                ky.get(`http://localhost:4000/book/`).json(),
                ky.get('http://localhost:4000/user').json()
            ]);

            
            batch(() => {
                dispatch(showBook(book));

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
            console.log("limpiando");
            return ky.stop;
        };
    }, [bookID, dispatch]);

    const onClickUser = useCallback((e) => {
        history.push(`/user/${user.id}`);
    })

    console.log(book);
    console.log(books);
    console.log(user);

    return (

        <div className="book-screen">
            <div className="book">
                <h1>{book.title}</h1>
                <img className="book-img" src="https://images.freeimages.com/images/premium/previews/1461/1461865-old-worn-book.jpg" width="100%" />
                <p><strong>Autor: </strong>{book.author}</p>
                <div className="description-field">
                <p>{book.description?<strong>Descripción:</strong>:<i>No hay descripción</i>}</p>
                <p>{book.description}</p>
                </div>
                <br/>
            </div>
            <div className={classes.root} width="80%">
            <p>otros libros de <strong onClick = {onClickUser}>{user.alias}</strong></p>
            
            {loaded && <BookGrid books={books}/>}

            </div>
        </div>

    )
};