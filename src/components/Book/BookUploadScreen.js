import ky from "ky";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import SearchField from "../SearchField";

export default function BookUploadScreen (){
    const dispatch = useDispatch();
    const history = useHistory();
    const [error, setError] = useState(null);

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
            try{
                const book = await ky.post('http://localhost:4000/book', {
                    json: {
                        user_account_id : userId,
                        title,
                        author,
                        description
                    }
                }).json();
                
                console.log(book);
                setError(null)
                history.push(`/book/${book.id}`);
            }catch (err) {
                console.log(err);
                const body = await err.response.json();
                console.log(body);
                setError(body);
            }
        }
        post()
    }, [userId, title, author, description, history]);

    return(

        <div className ="upload-book-screen">
            <SearchField />

            <div className="section-header">
                <h1>LIBROS</h1>
                <h5>Cargar un nuevo libro</h5>
            </div>
            <form id="book-form" className="book-form" onSubmit={onBookSubmit}>

                <input
                    className="input-user datos"
                    placeholder="Id del dueño"
                    onChange = {onChangeUserId}
                    type = "number"
                    value = {userId}
                    required
                /><br/>
                <input
                    className="input-title datos"
                    placeholder="Título"
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
                    Añadir libro
                </button>

            </form>
        </div>

    )
}