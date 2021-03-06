import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { ClickAwayListener, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import UserScreen from "../user/userScreen";
export default function BookUploadScreen (){
    const history = useHistory();
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [ message, setMessage ] = useState(null)

    const [userId, setUserId] = useState('');
    const onChangeUserId = useCallback((e) => {
        const value = e.target.value;
        setUserId(value === ''? value:Number(value));
    });

    const [title, setTitle] = useState('');
    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    });

    const [author, setAuthor] = useState('');
    const onChangeAuthor = useCallback((e) => {
        setAuthor(e.target.value);
    });

    const [description, setDescription] = useState('');
    const onChangeDescription = useCallback((e) => {
        setDescription(e.target.value)
    });

    const onBookSubmit = useCallback((e) => {
        e.preventDefault();

        async function post() {
                await axios.post('book', {
                        title,
                        author,
                        description
                
                }).then(response => {
                    setError(null);
                    history.push(`/book/${response.data.id}`);
                }).catch(error => {
                    if (error.response){
                        setError(error.response.data);
                        setMessage(error.response.data.message);
                    }
                    setOpen(true)
                });
        }
        post()
    }, [userId, title, author, description, history]);

    const handleClose = () => {
        setOpen(false);
    };

    return(

        <div className ="upload-book-screen">

            <ClickAwayListener onClickAway={handleClose}>
                <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" elevation={6}>{message}</Alert>
                </Snackbar>
            </ClickAwayListener>

            <div className="section-header">
                <h1>LIBROS</h1>
                <h5>Cargar un nuevo libro</h5>
            </div>
            <form id="book-form" className="book-form" onSubmit={onBookSubmit}>

                <input
                    className="input-title datos"
                    placeholder="T??tulo"
                    onChange = {onChangeTitle}
                    value = {title}
                    required
                /><br/>
                <input
                    className="input-author datos"
                    placeholder="Autor"
                    onChange = {onChangeAuthor}
                    value = {author}
                    required
                /><br/>
                <textarea
                    className="input-description datos"
                    placeholder="Descripcion"
                    form = "book-form"
                    onChange = {onChangeDescription}
                    value = {description}
                /><br/>
                <button type = "submit" className="send-btn">
                    A??adir libro
                </button>

            </form>
        </div>

    )
}