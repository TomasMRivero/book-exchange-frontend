'use strict'
import './css/Nav.css';
import { AppBar, Toolbar, IconButton, Slide, useScrollTrigger } from '@material-ui/core';
import { Home, AccountCircle  } from '@material-ui/icons';
import { useHistory, useRouteMatch } from "react-router";
import SearchField from "./SearchField";
import { useCallback } from 'react';

function ShowSearchBar({match}) {
    if (!match.isExact){
        return <SearchField />;
    }
    return null
}

export default function Nav(){
    const history = useHistory();
    const match = useRouteMatch("/");
    const onClickHome = useCallback((e) => {
        e.preventDefault()
        history.push('/');
    })
    let classes = ['nav-bar'];
    if (match.isExact){
        classes.push("no-searchbar");
    }
    return(
        <div className={classes.join(' ')}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        className="home-button" 
                        onClick = {onClickHome}
                    >
                        <Home />
                    </IconButton>
                    <ShowSearchBar match = {match}/>
                    <IconButton edge="end" className = "user-icon">
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}