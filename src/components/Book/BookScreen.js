import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { showBook, showUser, showBookList, showBookListIDs, showUserList, showUserListIDs, editBook, deleteBook } from "../../redux/actions";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper, ClickAwayListener, Snackbar, IconButton, TextField, DialogActions, DialogContent, DialogContentText, Button, Dialog, DialogTitle } from "@material-ui/core";
import { Edit, Delete, Cancel, Save, FormatColorResetOutlined } from "@material-ui/icons";
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
    typo:{
        wordBreak: 'break-all',
        width: '100%'
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

function EditSection(props){
    const book = props.book;
    const onClick = props.onClick;
    const title = props.values.title;
    const author = props.values.author;
    
    console.log(props.isOwner)
    if (props.isOwner){
        return(
            <Grid container>
                
                <Grid item xs={12} style={{display:'flex', height: 'auto', justifyContent: 'flex-end', alignItems: 'flex-start'}}>
                    {!props.editing && 
                    <IconButton size='small'>
                        <Edit onClick = {onClick.edit}/>
                    </IconButton>}
                    {props.editing && <>
                        <IconButton size='small' onClick = {onClick.save}>
                            <Save />
                        </IconButton>
                        <IconButton size='small' onClick = {onClick.edit}>
                            <Cancel />
                        </IconButton>
                    </>}
                    <IconButton size='small' onClick = {onClick.delete}>
                        <Delete />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    {!props.editing && <>
                    <Typography variant={'h6'} align={'left'}><b>{book.title}</b></Typography>
                    <Typography  variant={'subtitle1'} align={'left'}>{book.author}</Typography>
                    </>}
                    {props.editing &&<>                    
                        <TextField
                            multiline
                            style={{width:'100%', marginTop:10}}
                            label="Título"
                            value={title}
                            onChange={props.onChange.title}
                        />
                        <TextField
                            multiline
                            style={{width:'100%', marginTop:10}}
                            label="Autor" 
                            value={author}
                            onChange={props.onChange.author}
                        />
                    </>}
                </Grid>
    
            </Grid>
        )
    }
    return(
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={'h6'} align={'left'}><b>{book.title}</b></Typography>
                <Typography variant={'subtitle1'} align={'left'}>{book.author}</Typography>
            </Grid>
        </Grid>
    )
}

export default function BookScreen(){
    const classes = useStyles();

    const dispatch = useDispatch();
    const bookID = Number(useParams().id);
    const history = useHistory();

    const isAuthenticated = useSelector(state => state.models.authenticated);
    const authUser = useSelector(state => state.models.authUser);

    const book = useSelector(state => state.models.book);
    const user = useSelector(state => state.models.user);

    const bookIDs = useSelector(state => state.ui.books);
    const books = useSelector(state => bookIDs.map(id => state.models.books[id]));
        
    const[loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false)
    const [ message, setMessage ] = useState(null);
    const [ notFound, setNotFound ] = useState(false);
    
    const [editing, setEditing] = useState(false);

    async function fetch() {
        async function getBook() {
            return await axios.get(`book/${bookID}`);
        }
        async function getBooks() {
            return await axios.get(`book`);
        }
        async function getUsers() {
            return await axios.get('user');
        }

        Promise.all([getBook(), getBooks(), getUsers()])
            .then( results => {
                const book = results[0].data.books;
                const books = results[1].data;
                const users = results[2].data;

                
                batch(() => {
                    dispatch(showBook(book));
    
                    dispatch(showUser(users.find(u => u.id === book.user_account_id)));
    
                    dispatch(showBookList(books));
                    dispatch(showBookListIDs(books.filter(b => b.user_account_id === book.user_account_id && b.id !== bookID).map(b => b.id).reverse()));
    
                    dispatch(showUserList(users));
                    dispatch(showUserListIDs(users.map(u => u.id).reverse()));
    
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

    const isOwner = () => {
        if(isAuthenticated && authUser.id === user.id){
            return(true)
        }
        return(false)
    }

    useEffect(() => {
        fetch();
    }, [bookID, dispatch]);

    
    const handleClose = () => {
        setOpen(false);
    };

    const closeDialog = () => {
        setOpenDialog(false);
    }

    const onClickUser = useCallback((e) => {
        history.push(`/user/${user.id}`);
    })

    const onClickEdit = useCallback((e) => {
        e.preventDefault();
        setEditing(!editing)
    });

    const mainImage = "https://images.freeimages.com/images/premium/previews/1461/1461865-old-worn-book.jpg"
    const images = [
        "https://images.freeimages.com/images/premium/previews/1461/1461865-old-worn-book.jpg",
        "https://d2r9epyceweg5n.cloudfront.net/stores/171/018/products/365ecd13-4200-4df5-871b-e43d7e989929_1_105_c1-9e74bfaa47c91d2a8f16179761210084-1024-1024.jpeg",
        "https://www.xlsemanal.com/wp-content/uploads/sites/3/2020/03/todo-lo-que-un-libro-de-papel-puede-hacer-por-tu-cerebro-abrelo.jpg",
        "https://media.istockphoto.com/photos/old-book-picture-id139889744",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsqp64xwGXFNJnAoAymzSciNWnf8u9Sptvrw&usqp=CAU",
        "https://static4.depositphotos.com/1006472/361/i/950/depositphotos_3614368-stock-photo-blank-book.jpg",
    ];

    const [title, setTitle] = useState(book.title);
    const onChangeTitle = useCallback ((e) => {
        setTitle(e.target.value)
    });

    const [author, setAuthor] = useState(book.author);
    const onChangeAuthor = useCallback ((e) => {
        setAuthor(e.target.value)
    });

    const [description , setDescription] = useState(book.description);
    const onChangeDescription = useCallback((e) => {
        setDescription(e.target.value)
    });

    useEffect(() => {
        setEditing(false);
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
    }, [book]);

    const onSave = useCallback((e) => {
        e.preventDefault();
        async function put(){
            await axios.put(`book/${bookID}`, {
                title,
                author,
                description
        
            }).then(response => {
                setError(null);
                dispatch(editBook({
                    id: bookID,
                    user_account_id: authUser.id,
                    title: response.data.resp.title,
                    author: response.data.resp.author,
                    description: response.data.resp.description
                }));
                setEditing(false);
            }).catch(error => {
                if (error.response){
                    setError(error.response.data);
                    setMessage(error.response.data.message);
                }
                setOpen(true)
            });
        }
        put();
    }, [title, author, description, authUser, bookID])

    const onDelete = useCallback((e) => {
        e.preventDefault();
        async function del(){
            axios.delete(`book/${bookID}`).then(response => {
                dispatch(deleteBook(book));
                history.push(`../user/${authUser.id}`)
            }).catch(error => {
                if (error.response){
                    setError(error.response.data);
                    setMessage(error.response.data.message);
                }
                setOpen(true)
            });
        }
        del();
    }, [dispatch, book]);

    return (

        <div className={classes.root}>
            
            <ClickAwayListener onClickAway={handleClose}>
                <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" elevation={6}>{message}</Alert>
                </Snackbar>
            </ClickAwayListener>

            {loaded && !notFound && <>
                <div className={classes.gridContainer}>
                    
                    <Dialog
                        open={openDialog}
                        onClose={closeDialog}
                    >
                        <DialogTitle>Desea eliminar este libro?</DialogTitle>

                        <DialogContent>
                            <DialogContentText>
                                Se eliminará de forma definitiva.
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={closeDialog}>Cancelar</Button>
                            <Button onClick={closeDialog} autoFocus onClick={onDelete}>
                                Confirmar
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Grid container alignItems='flex-start' spacing={5} >
                    
                        <Grid className={classes.imagesContainer} height='100%' item xs={12} md={8}>
                            <div className={classes.titleMobile}>
                                <EditSection
                                    onChange={{title: onChangeTitle, author: onChangeAuthor}}
                                    values={{title: title, author: author}}
                                    classes={{typo: classes.typo}} book={book}
                                    isOwner={isOwner()}
                                    editing={editing}
                                    onClick={{edit: onClickEdit, save: onSave, delete: setOpenDialog}}
                                />
                            </div>
                            <BookImageGrid main={mainImage} images={images}/>

                        </Grid>
                        <Grid className={classes.imagesContainer} height='100%'item xs={12} md={4} >
                            <div className={classes.detailsContainer}>
                                <div className={classes.titleDesktop}>
                                    <EditSection
                                        onChange={{title: onChangeTitle, author: onChangeAuthor}}
                                        values={{title: title, author: author}}
                                        classes={{typo: classes.typo}}
                                        book={book}
                                        isOwner={isOwner()}
                                        editing={editing}
                                        onClick={{edit: onClickEdit, save: onSave, delete: setOpenDialog}}
                                    />
                                </div >
                                <Grid container>
                                    <Typography className={classes.typo} variant={'subtitle1'} align={'left'}><b>Genero: </b>GENERO</Typography>
                                    <Typography className={classes.typo} variant={'subtitle1'} align={'left'}><b>Orígen: </b>ORIGEN</Typography>
                                    <Typography className={classes.typo} variant={'subtitle1'} align={'left'}><b>Publicado por: </b> {user.alias}</Typography>
                                    <div style={{width:'100%'}}>
                                    <Typography className={classes.typo} variant={'h6'} align={'left'}><strong>Descripción:</strong></Typography>
                                    {!editing && <>
                                    <Typography className={classes.typo} variant={'body1'} align={'left'}>{book.description? book.description : <i>No hay descripción</i>}</Typography>
                                    </>}
                                    {editing && <TextField style={{width:'100%'}} multiline type="description" variant="outlined" value={description} onChange={onChangeDescription} />}
                                    </div>
                                </Grid>
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