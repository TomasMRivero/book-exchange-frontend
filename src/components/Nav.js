'use strict'
import { AppBar, Toolbar, IconButton, Slide, useScrollTrigger } from '@material-ui/core';
import { Home, AccountCircle  } from '@material-ui/icons';
import { useHistory, useRouteMatch } from "react-router";
import SearchField from "./SearchField";
import { useCallback } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        search: {
            color: 'inherit',
            width: '100%',
        },
        iconContaier:{
            display: 'flex',
            justifyContent: 'flex-end',
        }
}));

function ShowSearchBar({match}) {
    if (!match.isExact){
        return <SearchField />;
    }
    return null
}

export default function Nav(){
    const classes = useStyles();
    const history = useHistory();
    const match = useRouteMatch("/");
    const onClickHome = useCallback((e) => {
        e.preventDefault()
        history.push('/');
    })
    /*let classes = ['nav-bar'];
    if (match.isExact){
        classes.push("no-searchbar");
    }*/
    return(
        <div className={classes.grow}>
            <AppBar position="sticky">
                <Toolbar style={{display: 'flex', justifyContent:'space-between'}}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        className="home-button" 
                        onClick = {onClickHome}
                    >
                        <Home />
                    </IconButton>
                    <ShowSearchBar className={classes.search} nav={1} match = {match} style={{width:'50vw'}}/>
                    <div className={classes.iconContaier}>
                        <IconButton edge="end" className = {classes.userIcon}>
                            <AccountCircle />
                        </IconButton>   
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}