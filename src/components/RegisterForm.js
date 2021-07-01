import { Button, ClickAwayListener, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { setAuthenticated, setAuthUser } from "../redux/actions";

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
        width: '80%',
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

export default function RegisterForm(){
    
    const classes = useStyles();
    const dispatch = useDispatch()

    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);

    const [name, setName] = useState('');
    const onChangeName = useCallback((e) => {
        setName(e.target.value)
    })

    const [gender, setGender] = useState('');
    const onChangeGender = useCallback((e) => {
        setGender(Number(e.target.value))
    });

    const [alias, setAlias] = useState('');
    const onChangeAlias = useCallback((e) => {
        setAlias(e.target.value);
    });

    const [mail, setMail] = useState('');
    const onChangeMail = useCallback((e) => {
        setMail(e.target.value);
    });

    const [password, setPassword] = useState('');
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const onChangeConfirmPassword = useCallback((e) => {
        setConfirmPassword(e.target.value);
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

    async function login() {
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

    async function register() {
        await axios.post('register',{
            mail: mail,
            gender_id: gender,
            alias: alias,
            name: name,
            password: password
        }).then(response =>{
            setError(null);
            console.log(response);
            login();
        }).catch(error => {
            if (error.response){
                setError(error.response);
                setMessage(error.response.data);
            }
            setOpen(true)
        })
    }

    const onRegister = useCallback(async(e) => {
        e.preventDefault();
        try{
            if(password !== confirmPassword){
                throw {message: "Las contraseñas no coinciden"};
            }
            register();
        }catch(error){
            setMessage(error.message);
            setOpen(true);
        }
    },[name, gender, alias, mail, password, confirmPassword]);

    
    const handleClose = () => {
        setOpen(false);
    };
    
    return(
        <form className={classes.root} id="register-form" onSubmit={onRegister}>

            <ClickAwayListener onClickAway={handleClose}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" elevation={6}>{message}</Alert>
                </Snackbar>
            </ClickAwayListener>

            <Grid container className={classes.container} spacing={5}>
                
                <Grid item xs={12}>
                    <TextField className={classes.input} label="Alias" variant="outlined" value={alias} onChange={onChangeAlias} required={true} />
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.input} label="Nombre" variant="outlined" value={name} onChange={onChangeName} required={true} />
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={classes.input} variant="outlined" 
                        required={true}>
                    <InputLabel id="gender">Genero</InputLabel>        
                    <Select 
                        labelId="gender"
                        label="Genero"
                        value={gender}
                        onChange={onChangeGender}
                        style={{textAlign: "left"}}
                    >
                        <MenuItem value={1} >Hombre</MenuItem>
                        <MenuItem value={2} >Mujer</MenuItem>
                        <MenuItem value={3} >No binario</MenuItem>
                        <MenuItem value={4} >Otro</MenuItem>
                        <MenuItem value={5} >Prefiero no aclarar</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.input} label="Mail" variant="outlined" value={mail} onChange={onChangeMail} type="email" required={true} />
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.input} label="Contraseña" variant="outlined" value={password} onChange={onChangePassword} type="password" required={true} />
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.input} label="Confirme su contraseña" variant="outlined" value={confirmPassword} onChange={onChangeConfirmPassword} type="password" required={true} />
                </Grid>
                <Grid item xs={12}>
                    <Button className={classes.button} type="submit" variant="contained">Registrarse</Button>
                </Grid>


            </Grid>

        </form >
    )
}