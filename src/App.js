import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import BookScreen from './components/Book/BookScreen';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/book" component={BookScreen} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
