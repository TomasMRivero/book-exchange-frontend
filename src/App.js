import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import BookScreen from './components/Book/BookScreen';
import BookSearchResults from './components/Book/BookSearchResults';
import BookUploadScreen from './components/Book/BookUploadScreen';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <Route path="/book/search/:field" component={BookSearchResults} />
          <Route path="/book/showall" component={BookScreen} />
          <Route path="/book" component={BookUploadScreen} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}
