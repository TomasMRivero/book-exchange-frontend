import axios from "axios";
import { useCallback, useState } from "react"
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated, setAuthUser } from "../redux/actions";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
    root:{
        margin: 'auto',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            marginTop: 64,
        },
        border: 0,
        borderRadius: 3,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    }
}));

export default function LoginForm(props){
    const classes = useStyles();
    const dispatch = useDispatch();

    console.log(props);

    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const isAuthenticated = useSelector(state => state.models.authenticated)

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
        console.log(axios.defaults.headers.common.authorization);
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
                console.error(error);
                console.error(error.response)
            })
        }

        post()

    }, [alias, password]); 

    return(
        <form className={classes.root} id="login-form" onSubmit={onLogin}>

            <TextField id="outlined-basic" label="Usuario" variant="outlined" value={alias} onChange={onChangeAlias}/>
            <TextField id="outlined-basic" label="Contraseña" type="password" variant="outlined" value={password} onChange={onChangePassword}/>
            <button type="submit">Submit</button>
            
            {isAuthenticated? <Redirect to="/" /> : null}
        
        </form>
    )
        
}