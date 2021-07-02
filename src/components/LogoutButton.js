import { Typography } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { unsetAuthenticated, unsetAuthUser } from "../redux/actions";

export default function LogoutButton(props){
    const dispatch = useDispatch();
    

    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);
    

    async function logout(){
        await axios.post('logout')
        .then(response =>{
            setError(null);
            console.log(response);
            localStorage.removeItem('token', response.data.token);
            axios.defaults.headers.common['authorization'] = null;
            dispatch(unsetAuthenticated());
            dispatch(unsetAuthUser())
        }).catch(error => {
            if (error.response){
                setError(error.response);
                setMessage(error.response.data);
            }
            setOpen(true)
        })
    };

    const onClickLogout = useCallback(() => {
        logout()
    });

    return (
        <Typography onClick={onClickLogout} className={props.className} style={{marginLeft: 5}}><b>Logout</b></Typography>
    )
}