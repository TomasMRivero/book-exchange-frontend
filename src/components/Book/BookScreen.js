import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { showBook, showUser, showBookList, showBookListIDs, showUserList, showUserListIDs } from "../../redux/actions";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper, ClickAwayListener, Snackbar } from "@material-ui/core";

import BookGrid from "./BookGrid";
import BookImageGrid from "./BookImageGrid";
import { Alert } from "@material-ui/lab";
import NotFound from "../NotFound";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            marginTop: 64,
        },
        border: 0,
        borderRadius: 3,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflowX:'hidden'
    },
    gridContainer:{
        width: '90%',
        margin: 'auto',
        padding: 20,
        borderBottom: '1px solid lightgray',
    },
    imagesContainer:{
        [theme.breakpoints.up('md')]: {
            position: 'sticky',
        },
        margin: 0,
        top: 64,
    },
    detailsContainer:{
        padding: 15,
        borderRadius: 15,
        border: '1px solid lightgray',
    },
    titleDesktop:{
        display: 'block',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    titleMobile:{
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
        marginBottom: 15
    },
    bookCarousel:{
        width: '90%',
        margin: 'auto',
        marginTop: 30,
        background: 'lightgray',
        overflow: 'hidden',
        borderRadius: 15,
    },
    carouselPaper:{
        fontSize: 20,
        padding: 5
    },
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
        
    const[loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [ message, setMessage ] = useState(null);
    const [ notFound, setNotFound ] = useState(false);
    
    async function fetch() {
        async function getBook() {
            return await axios.get(`http://localhost:4000/book/${bookID}`);
        }
        async function getBooks() {
            return await axios.get(`http://localhost:4000/book`);
        }
        async function getUsers() {
            return await axios.get('http://localhost:4000/user');
        }

        Promise.all([getBook(), getBooks(), getUsers()])
            .then( results => {
                const book = results[0];
                const books = results[1];
                const users = results[2];

                batch(() => {
                    dispatch(showBook(book.data));
    
                    dispatch(showUser(users.data.find(u => u.id === book.data.user_account_id)));
    
                    dispatch(showBookList(books.data));
                    dispatch(showBookListIDs(books.data.filter(b => b.user_account_id === book.data.user_account_id && b.id !== bookID).map(b => b.id).reverse()));
    
                    dispatch(showUserList(users.data));
                    dispatch(showUserListIDs(users.data.map(u => u.id).reverse()));
    
                    setError(null);
                    setLoaded(true);
                });
            }).catch(error => {
                if (error.response){
                    if (error.response.status === 404){
                        setNotFound(true);
                    }
                    setError(error.response.data);
                    setMessage(error.response.data.message);
                }
                setOpen(()=>{return (error.response.status !== 404?true:false)})
            });
    }

    useEffect(() => {
        fetch()
        return function cleanup() {
            console.log("limpiando");
        };
    }, [bookID, dispatch]);

    
    const handleClose = () => {
        setOpen(false);
    };

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

    
    return (

        <div className={classes.root}>
            
            <ClickAwayListener onClickAway={handleClose}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" elevation={6}>{message}</Alert>
                </Snackbar>
            </ClickAwayListener>

            {loaded && !notFound && <>
                <div className={classes.gridContainer}>
                    
                    <Grid container alignItems='flex-start' spacing={5}>
                    
                        <Grid className={classes.imagesContainer} height='100%' item xs={12} md={8}>
                            <div className={classes.titleMobile}>
                                <Typography variant={'h6'} align={'left'}><b>{book.title}</b></Typography>
                                <Typography variant={'subtitle1'} align={'left'}>{book.author}</Typography>
                            </div>
                            <BookImageGrid main={mainImage} images={images}/>

                        </Grid>
                        <Grid className={classes.imagesContainer} height='100%' item xs={12} md={4}>
                            <div className={classes.detailsContainer}>
                                <div className={classes.titleDesktop}>
                                    <Typography variant={'h5'} align={'left'}><b>{book.title}</b></Typography>
                                    <Typography variant={'subtitle1'} align={'left'}><b>Autor: </b>{book.author}</Typography>
                                </div>
                                <Typography variant={'subtitle1'} align={'left'}><b>Genero: </b>GENERO</Typography>
                                <Typography variant={'subtitle1'} align={'left'}><b>Orígen: </b>ORIGEN</Typography>
                                <Typography variant={'subtitle1'} align={'left'}><b>Publicado por: </b> {user.alias}</Typography>
                                <div>
                                <Typography variant={'h6'} align={'left'}><strong>Descripción:</strong></Typography>
                                <Typography variant={'body1'} align={'left'}>{book.description? book.description : <i>No hay descripción</i>}</Typography>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <br/>
                </div>
                <Grid container className={classes.bookCarousel} spacing={0}>
                <Grid item xs={12}><Paper square className={classes.carouselPaper} elevation={3}> otros libros de <b onClick = {onClickUser}>{user.alias}</b></Paper></Grid>
                <Grid item xs={12}>{loaded && <BookGrid books={books}/>}</Grid>
                </Grid>
            </>}
            {notFound &&
                <NotFound target='el libro'/>
            }
        </div>

    )    
};