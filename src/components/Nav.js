'use strict'
import { AppBar, Toolbar, IconButton, Typography, Box } from '@material-ui/core';
import { Home, AccountCircle  } from '@material-ui/icons';
import { useHistory, useRouteMatch } from "react-router";
import SearchField from "./SearchField";
import { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';

const useStyles = makeStyles((theme) => ({
        grow: {
            width: '100%',
            padding: 0,
            margin: 0,
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        search: {
            marginLeft: 0,
            color: 'inherit',
            width: '60%',
            [theme.breakpoints.up('sm')]: {
                width: '70%'
            },
        },
        typo:{
            transition: ".3s ease",
            color: 'rgba(0, 0, 0, 0.74)',
            cursor: 'pointer',
            '&:hover':{
                color: 'rgba(255, 255, 255, 0.9)'
            }
        },
        iconContaier:{
            display: 'flex',
            justifyContent: 'flex-end',
            marginLeft: theme.spacing(2),
        }
}));

function ShowSearchBar(props) {
    if (!props.match.isExact){
        return(
            <div className={props.className}>
            <SearchField />
            </div>
        );
    }
    return null
}
function ShowLogin(props) {
    const classes = props.classes;
    if (props.isAuthenticated){        
        return(
            <Box style={{display:'flex', alignItems:'center', justifyContent: 'center'}}>
            <div className={classes.iconContaier}>
                <IconButton size="large" edge="end" className = {classes.userIcon} onClick={props.onClick.onClickAccount}>
                    <AccountCircle />
                </IconButton> 
            </div>
                <LogoutButton className = {classes.typo}/>
            </Box>
        )
    }
    return (
        <div>
            <Typography onClick={props.onClick.onClickLogin} className={classes.typo}><b>Login</b></Typography>
        </div>
    )
}

export default function Nav(){
    const classes = useStyles();
    const history = useHistory();
    const match = useRouteMatch("/");
    const isAuthenticated = useSelector(state => state.models.authenticated);
    const authUser = useSelector(state => state.models.authUser);


    const onClickHome = useCallback((e) => {
        e.preventDefault()
        history.push('/');
    });

    const onClickLogin = useCallback(() => {
        history.push('/login');
    });

    const onClickAccount = useCallback((e) => {
        e.preventDefault();
        history.push(`/user/${authUser.id}`);            
    });

    return(
        <div className={classes.grow}>
            <AppBar position='fixed'>
                <Toolbar style={{display: 'flex', justifyContent:'space-between'}}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        className="home-button" 
                        onClick = {onClickHome}
                    >
                        <Home />
                    </IconButton>
                    
                    <ShowSearchBar className={classes.search} nav={1} match = {match}/>
                    
                    <ShowLogin isAuthenticated={isAuthenticated} classes = {{ userIcon : classes.userIcon, iconContainer: classes.iconContainer, typo: classes.typo}} onClick={{onClickLogin, onClickAccount}}/>
                    
                </Toolbar>
            </AppBar>
        </div>
    )
}