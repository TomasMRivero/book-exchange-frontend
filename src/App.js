import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import BookScreen from './components/Book/BookScreen';
import BookSearchResults from './components/Book/BookSearchResults';
import SearchField from './components/SearchField';
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/book/search/:field" component={BookSearchResults} />
          <Route path="/book/showall" component={BookScreen} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
