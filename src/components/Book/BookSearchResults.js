import QueryString from "qs";
import ky from "ky";
import { useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { showBookList, showBookListIDs, showUserList, showUserListIDs } from "../../redux/actions";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BookItem from './BookItem';

const useStyles = makeStyles((theme) => ({
    root:{
        margin: 'auto',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            marginTop: 64,
        },
    },
    header:{
        margin: 'auto',
        padding: 20,
    },
    title:{
        fontWeight: "bold",
        [theme.breakpoints.down('xs')]: {
            fontSize: 18,
        },
    },
    resultList:{
        width: '100%',
        border: '1px solid #f0f0f0',
        borderRadius: 10
    }
}));


function Result({books, value, classes, users, loaded}){
    if(books.length > 0){
        return (
            <div className={classes.resultList}>
            {loaded && books.map(book =>
                <BookItem
                    className = {classes.listItem}
                    key = {book.id}
                    book = {book}
                    owner = {users[book.user_account_id]}
                />
            )}
            </div>
        );
    }
    return(
        <div>
            <p>No se hallaron resultados para {value.q}</p>
        </div>
    )
}


export default function BookSearchResults({location}){
    const classes = useStyles();
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

    return(
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography className={classes.title} variant='h5'>Resultado de la búsqueda:</Typography>
            </div>
            
            <Result books={books} value={value} classes={classes} users={users} loaded={loaded}/>

        </div>
    )
}