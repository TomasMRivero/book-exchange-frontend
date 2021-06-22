import { useState, useCallback } from "react";
import { useHistory } from 'react-router';
import {Select, InputBase, MenuItem, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
export default function SearchField(){
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
            <form className="search-form" onSubmit={onSearch} > 
                <IconButton
                    type="submit"
                    className="search-button"
                >
                    <SearchIcon />   
                </IconButton>
                <InputBase
                    className = "search-value"
                    placeholder = "Buscar por..."
                    onChange={onChangeSearchValue}
                    value={searchValue}
                />
                <Select
                    className="search-field"
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
                
                
            
                

            </form>
        </>
    )
}