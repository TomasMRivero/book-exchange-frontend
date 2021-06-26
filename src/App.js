import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import BooksScreen from './components/Book/BooksScreen';
import BookSearchResults from './components/Book/BookSearchResults';
import BookUploadScreen from './components/Book/BookUploadScreen';
import BookScreen from './components/Book/BookScreen';
import UserScreen from './components/user/userScreen';
import Nav from './components/Nav';
import MainScreen from './components/MainScreen';
import { Container } from '@material-ui/core';
import ScrollToTop from './components/ScrollToTop';
export default function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        
        <Nav />
        <Container maxWidth="md" style={{background: "#fff", minHeight:'100vh', paddingBottom: 45}}>
        <ScrollToTop />
        <Switch >
          <Route exact path="/" component={MainScreen} />
          <Route path="/book/search/:field" component={BookSearchResults} />
          <Route path="/book/showall" component={BooksScreen} />
          <Route path="/book/:id" component={BookScreen} />
          <Route path="/book" component={BookUploadScreen} />
          <Route path="/user/:id" component={UserScreen} />
        </Switch>
        </Container>
      </BrowserRouter>
    </div>
  );
}
