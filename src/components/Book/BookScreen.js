import ky from "ky-universal";
import { useCallback, useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { showBook, showUser, showBookList, showBookListIDs, showUserList, showUserListIDs } from "../../redux/actions";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper } from "@material-ui/core";

import BookGrid from "./BookGrid";
import BookImageGrid from "./BookImageGrid";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            marginTop: 64,
        },
        background: 'white',
        border: 0,
        borderRadius: 3,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
    },
    gridContainer:{
        width: '90%',
        margin: 'auto',
        padding: 20,
        borderBottom: '1px solid lightgray',
        background: 'white',
    },
    imagesContainer:{
        [theme.breakpoints.up('sm')]: {
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
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    },
    titleMobile:{
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        },
    },
    bookCarousel:{
        width: '80vw',
        margin: 'auto',
        marginTop: 30,
        marginBottom: 45,
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

        <div className={classes.root}>
            <div className={classes.gridContainer}>
                
                <Grid container alignItems='flex-start' spacing={5}>
                  
                    <Grid className={classes.imagesContainer} height='100%' item xs={12} sm={8}>
                        <div className={classes.titleMobile}>
                            <Typography variant={'h6'} align={'left'}><b>{book.title}</b></Typography>
                            <Typography variant={'subtitle1'} align={'left'}>{book.author}</Typography>
                        </div>
                        <BookImageGrid main={mainImage} images={images}/>

                    </Grid>
                    <Grid className={classes.imagesContainer} height='100%' item xs={12} sm={4}>
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
        </div>

    )
};