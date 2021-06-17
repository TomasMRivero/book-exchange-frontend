import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import BooksScreen from './components/Book/BooksScreen';
import BookSearchResults from './components/Book/BookSearchResults';
import BookUploadScreen from './components/Book/BookUploadScreen';
import BookScreen from './components/Book/BookScreen';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <Route path="/book/search/:field" component={BookSearchResults} />
          <Route path="/book/showall" component={BooksScreen} />
          <Route path="/book/:id" component={BookScreen} />
          <Route path="/book" component={BookUploadScreen} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}
