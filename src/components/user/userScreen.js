import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { editUser, showBookList, showBookListIDs, showUser, showUserList, showUserListIDs } from "../../redux/actions";
import BookItem from "../Book/BookItem";
import { Avatar, Typography, Grid, ClickAwayListener, Snackbar, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import NotFound from "../NotFound";

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
    },
    button:{
        transition: "1s ease",
        borderColor: '#6fa1ff',
        '&:hover':{
            borderColor: '#a5c5ff',
            background: '#fffff'
        },
        borderRadius: 15,
        margin: 5
    },
    buttonContainer:{
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'flex-start'
        },
    }
}))


export default function UserScreen(){
    const dispatch =  useDispatch();
    const userID = Number(useParams().id);
    const classes = useStyles()

    const isAuthenticated = useSelector(state => state.models.authenticated);
    const authUser = useSelector(state => state.models.authUser);
    
    const user = useSelector(state => state.models.user);

    const bookIDs = useSelector(state => state.ui.books);
    const books = useSelector(state => bookIDs.map(id => state.models.books[id]));

    const[loaded, setLoaded] = useState('false');
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [ message, setMessage ] = useState(null);
    const [ notFound, setNotFound ] = useState(false)

    const [editing, setEditing] = useState(false);

    async function fetch() {
        async function getUserById(){
            return await axios.get(`user/${userID}`);
        }
        async function getBooks(){
            return await axios.get('book/');
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
    
                setError(null);
                setLoaded(true);
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
        fetch();
        return function cleanup() {
        };

    }, [userID, dispatch]);

    const handleClose = () => {
        setOpen(false);
    };

    const onClickEdit = useCallback((e) => {
        e.preventDefault();
        setEditing(!editing)
    })

    const isOwner = () => {
        if(isAuthenticated && authUser.id === user.id){
            return(true)
        }
        return(false)
    }

    const [alias, setAlias] = useState(user.alias);
    const [name, setName] = useState(user.name);

    const onChangeAlias = useCallback((e) => {
        setAlias(e.target.value)
    });
    const onChangeName = useCallback((e) => {
        setName(e.target.value)
    });

    useEffect(() => {
        setEditing(false);
        setAlias(user.alias);
        setName(user.name);
    }, [user]);

    const onSave = useCallback((e) => {
        e.preventDefault();
        async function put(){
            axios.put('user/me',{
                alias,
                name
            }).then(response => {
                setError(null);
                dispatch(editUser({
                    id: user.id,
                    mail: user.mail,
                    gender_id: user.gender_id,
                    alias: response.data.alias,
                    name: response.data.name,
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
    }, [user, name, alias, dispatch]);

    console.log(isOwner())
    
    return(
        <div className = {classes.root}>

            <ClickAwayListener onClickAway={handleClose}>
                <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" elevation={6}>{message}</Alert>
                </Snackbar>
            </ClickAwayListener>

            {loaded && !notFound && <>
                <Grid container className={classes.user} alignItems="center" spacing={3}>

                    <Grid className={classes.avatarContainer} item xs={5} sm={12}>
                    <Avatar
                        className={classes.avatar}
                        alt={user.name}
                        src=""
                    />
                    </Grid>

                    <Grid item xs={7} sm={12}>
                        {!editing && <><Typography className={classes.info} variant='h5'>{user.name}</Typography>
                        <Typography className={classes.info} variant="subtitle2">{"@"+user.alias}</Typography></>}
                        {editing && <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <TextField size="small" label="name" value={name} onChange={onChangeName}/>
                            <TextField size="small" label="alias" value={alias} onChange={onChangeAlias}/>
                        </div>}
                        {isOwner() && !editing && <div className={classes.buttonContainer}><Button className={classes.button} variant="outlined" onClick={onClickEdit}>Editar perfil</Button></div>}
                        {isOwner() && editing && <div className={classes.buttonContainer}>
                            <Button className={classes.button} variant="outlined" onClick={onClickEdit}>Cancelar</Button>
                            <Button className={classes.button} variant="outlined" onClick={onSave}>Guardar</Button>
                        </div>}
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
            {notFound && <NotFound target="el usuario"/>}
        </div>
    )
}