import axios from "axios";
import { useCallback, useState } from "react"
import { Button, ClickAwayListener, Grid, Snackbar, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated, setAuthUser } from "../redux/actions";
import { Redirect } from "react-router";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root:{
        margin: 'auto',
        width:' 100%',
        height: '100vh',
        border: 0,
        borderRadius: 3,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        display: 'flex',
        alignItems: 'center',
    },
    container:{
        width: 'auto',
        [theme.breakpoints.down('xs')]: {
            width:'95%'
        },
        border: '1px solid #f0f0f0',
        borderRadius: 15,
    },
    input:{
        width: '100%'
    },
    button:{
        
        width: 'auto',
        transition: "1s ease",
        fontWeight: 'bold',
        color: '#13131e',
        background: '#6fa1ff',
        '&:hover':{
            background: '#a5c5ff',
        },

    }
}));

export default function LoginForm(props){
    const classes = useStyles();
    const dispatch = useDispatch();

    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);

    const [alias, setAlias] = useState('');
    const onChangeAlias = useCallback((e) => {
        setAlias(e.target.value);
    });

    const [password, setPassword] = useState('');
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    });

    async function getAuthUser(){
        await axios.get('/user/me').then(
          response => {
            const user = response.data;
            dispatch(setAuthUser(user));
          }).catch(error => {
            console.error(error);
            console.error(error.response);
          })    
      }

    const onLogin = useCallback((e) => {
        e.preventDefault();
        async function post() {
            await axios.post('login',{
                alias: alias,
                password: password
            }).then(response =>{
                setError(null);
                console.log(response);
                localStorage.setItem('token', response.data.token);
                axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
                getAuthUser()
                dispatch(setAuthenticated());
            }).catch(error => {
                if (error.response){
                    setError(error.response);
                    setMessage(error.response.data);
                }
                setOpen(true)
            })
        }
        post()

    }, [alias, password]); 

    
    const handleClose = () => {
        setOpen(false);
    };


    return(
        <form className={classes.root} id="login-form" onSubmit={onLogin}>

            <ClickAwayListener onClickAway={handleClose}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" elevation={6}>{message}</Alert>
                </Snackbar>
            </ClickAwayListener>

            <Grid container className={classes.container} spacing={5}>
                <Grid item xs={12}>
                    <TextField className={classes.input} id="outlined-basic" label="Usuario" variant="outlined" value={alias} onChange={onChangeAlias}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.input} id="outlined-basic" label="Contraseña" type="password" variant="outlined" value={password} onChange={onChangePassword}/>
                </Grid>
                <Grid item xs={12}>
                    <Button className={classes.button} type="submit" variant="contained">Iniciar Sesión</Button>
                </Grid>
            </Grid>
           
            
        
        </form>
    )
        
}