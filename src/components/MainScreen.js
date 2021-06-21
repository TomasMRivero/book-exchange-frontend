import { useCallback } from "react"
import { useHistory } from "react-router"
import SearchField from "./SearchField"

export default function MainScreen(){
    const history = useHistory()
    const onClickUploadBook = useCallback((e) => {
        history.push('/book');
    }, [history])
    return(
        <div className="MainScreen">
            <br />
            <br />
            <br />
            <SearchField />
            <p style={{textAlign: "center"}}>ó</p>
            <h3 onClick={onClickUploadBook} style={{cursor:'pointer'}}>Pulicar un nuevo libro</h3>
            <br />
        </div>
    )
}