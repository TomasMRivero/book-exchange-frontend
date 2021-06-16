import { useState, useCallback } from "react";
import { useHistory } from 'react-router';

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
        history.push(`/search/${searchField}?q=${searchValue.trim()}`);
    }, [history, searchField, searchValue]);


    return(
        <div className="SearchField">
            <form className="search-form" onSubmit={onSearch}>
                <input
                    className = "search-value"
                    placeholder = "Buscar por..."
                    onChange={onChangeSearchValue}
                    value={searchValue}
                />

                <select
                    className="search-field"
                    id="field"
                    name="field"
                    form="search-form"
                    onChange={onChangeSearchField}
                    value={searchField}
                >
                    <option
                        key="title"
                        value="title"
                    >
                        Título
                    </option>
                    <option
                        key="author"
                        value="author"
                    >
                        Autor
                    </option>
                </select>
                <button
                    type="submit"
                    className="search-button"
                >
                    Buscar    
                </button>

            </form>
        </div>
    )
}