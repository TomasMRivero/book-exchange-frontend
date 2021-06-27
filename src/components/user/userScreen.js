import axios from "axios";
import { useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { showBookList, showBookListIDs, showUser, showUserList, showUserListIDs } from "../../redux/actions";
import BookItem from "../Book/BookItem";
import { Avatar, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root:{
        margin: 'auto',
        marginTop: 56,
        padding: 0,
        [theme.breakpoints.up('sm')]: {
            padding: 25,
            marginTop: 64,
        },
        overflowX: 'hidden'
    },
    user:{
        width: '100%',
        margin: 'auto',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center'
        },
    },
    avatar:{
        margin: 'auto',
        width: theme.spacing(18),
        height: theme.spacing(18),
        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
    },
    info:{
        '&:first-child':{
            fontWeight: 'bold'
        },
        [theme.breakpoints.down('xs')]: {
            textAlign: 'left'
        },
    },
    bookList:{
        width: '100%',
        margin:0,
        border: '1px solid #f0f0f0',
        borderRadius: 10
    }
}))


export default function UserScreen(){
    const dispatch =  useDispatch();
    const userID = Number(useParams().id);
    const classes = useStyles()

    const user = useSelector(state => state.models.user);

    const bookIDs = useSelector(state => state.ui.books);
    const books = useSelector(state => bookIDs.map(id => state.models.books[id]));

    const[loaded, setLoaded] = useState('false');
    async function fetch() {
        async function getUserById(){
            return await axios.get(`http://localhost:4000/user/${userID}`);
        }
        async function getBooks(){
            return await axios.get('http://localhost:4000/book/');
        }
        Promise.all([getUserById(), getBooks()])
            .then(results =>{
                const user = results[0];
                const books = results[1];

                batch(() => {
                    dispatch(showUser(user.data));
    
                    dispatch(showBookList(books.data));
                    dispatch(showBookListIDs(books.data.filter(b => b.user_account_id === userID).map(b => b.id).reverse()));
    
                    dispatch(showUserList([user.data]));
                    dispatch(showUserListIDs([userID.data]));
                });
    
                setLoaded(true);
            }).catch(error => {
                if(error.response){
                    console.error(error.response);
                }
            });
    }

    useEffect(() => {
        fetch();
        return function cleanup() {
        };

    }, [userID, dispatch]);

    return(
        <div className = {classes.root}>
            {loaded && <>
                <Grid container className={classes.user} alignItems="center" spacing={3}>

                    <Grid className={classes.avatarContainer} item xs={5} sm={12}>
                    <Avatar
                        className={classes.avatar}
                        alt={user.name}
                        src="htstps://s03.s3c.es/imag/_v0/770x420/7/6/f/GettyImages-522796439.jpg"
                    />
                    </Grid>

                    <Grid item xs={7} sm={12}>
                        <Typography className={classes.info} variant='h5'>{user.name}</Typography>
                        <Typography className={classes.info} variant="subtitle2">{"@"+user.alias}</Typography>
                    </Grid>
                    <Grid item xs={12}>                        
                        <span>{books.length} Libros publicados:</span>
                    </Grid>
                    
                </Grid>
                
                
                {books && <div className={classes.bookList}>
                    {loaded && books.map(book =>
                        <BookItem
                            className = {classes.listItem}
                            key = {book.id}
                            book = {book}
                            owner = {user}
                        />
                    )}
                </div>}
            </>}
        </div>
    )
}