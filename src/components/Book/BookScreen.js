import ky from "ky-universal";
import { useCallback, useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { showBook, showUser, showBookList, showBookListIDs, showUserList, showUserListIDs } from "../../redux/actions";
import { makeStyles } from '@material-ui/core/styles';
import BookGrid from "./BookGrid";
import BookImageGrid from "./BookImageGrid";


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
    const mainImage = "https://images.freeimages.com/images/premium/previews/1461/1461865-old-worn-book.jpg"
    const images = [
        "https://images.freeimages.com/images/premium/previews/1461/1461865-old-worn-book.jpg",
        "https://d2r9epyceweg5n.cloudfront.net/stores/171/018/products/365ecd13-4200-4df5-871b-e43d7e989929_1_105_c1-9e74bfaa47c91d2a8f16179761210084-1024-1024.jpeg",
        "https://www.xlsemanal.com/wp-content/uploads/sites/3/2020/03/todo-lo-que-un-libro-de-papel-puede-hacer-por-tu-cerebro-abrelo.jpg",
        "https://media.istockphoto.com/photos/old-book-picture-id139889744",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsqp64xwGXFNJnAoAymzSciNWnf8u9Sptvrw&usqp=CAU",
        "https://static4.depositphotos.com/1006472/361/i/950/depositphotos_3614368-stock-photo-blank-book.jpg",
    ]

    console.log(book);
    console.log(books);
    console.log(user);

    return (

        <div className="book-screen">
            <div className="book">
                <h1>{book.title}</h1>
                <BookImageGrid main={mainImage} images={images} />
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