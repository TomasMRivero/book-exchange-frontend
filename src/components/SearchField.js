import { useState, useCallback } from "react";
import { useHistory } from 'react-router';
import {Select, InputBase, MenuItem, IconButton, Grid} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    search: {
        width: '70%',
        marginRight: theme.spacing(2),
        marginLeft: 0,
        display: 'flex',
        position: 'relative',
        padding: '5px',
        height: '1.7em',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
    },
    IconButton:{
        padding: theme.spacing(0),
        height: '100%',
        margin: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      height: '100%',
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
      width: '100%'
    },
    selectContainer:{
        height: '100%',
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    select:{
        height: '100%',
        fontSize: 14
    }
}));

export default function SearchField(props){
    const classes = useStyles();
    const history = useHistory();

    const [searchValue, setSearchValue] = useState('');
    const onChangeSearchValue = useCallback((e) => {
        setSearchValue(e.target.value)
    }, []);

    const [searchField, setSearchField] = useState("title");
    const onChangeSearchField = useCallback((e) => {
        setSearchField(e.target.value)
    }, []);

    const onSearch = useCallback((e) => {
        e.preventDefault();
        if (!searchField || !searchValue){
            return
        }
        const uri = searchValue.trim();
        const resp = encodeURIComponent(uri)

        
        history.push(`/book/search/${searchField}?q=${resp}`);
    }, [history, searchField, searchValue]);

    
    return(
        <>
            <form className={classes.search} onSubmit={onSearch} >
                    <IconButton type='submit' className={classes.IconButton}>
                        <SearchIcon className={classes.searchIcon}/>
                    </IconButton>
                    <div className={classes.inputRoot}>
                        <InputBase 
                            className= {classes.inputInput}
                            placeholder = "Buscar por..."
                            onChange={onChangeSearchValue}
                            value={searchValue}
                        />
                        <div className={classes.selectContainer}>
                        <Select
                            className = {classes.select}
                            variant="outlined"
                            id="field"
                            name="field"
                            form="search-form"
                            onChange={onChangeSearchField}
                            value={searchField}
                        >
                            <MenuItem
                                key="title"
                                value="title"
                            >
                                Título
                            </MenuItem>
                            <MenuItem
                                key="author"
                                value="author"
                            >
                                Autor
                            </MenuItem>
                        </Select>
                        </div>
                    </div>
            </form>
        </>
    )
}