import './App.css';

import { Switch, Route, useLocation } from 'react-router-dom'

import BooksScreen from './components/Book/BooksScreen';
import BookSearchResults from './components/Book/BookSearchResults';
import BookUploadScreen from './components/Book/BookUploadScreen';
import BookScreen from './components/Book/BookScreen';
import UserScreen from './components/user/userScreen';
import Nav from './components/Nav';
import MainScreen from './components/MainScreen';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound';
const useStyles = makeStyles((theme) => ({
  root:{
    background: "#fff",
    minHeight:'100vh',
    padding: 0,
    paddingBottom: 45,
  }
}));



export default function App() {
  const classes=useStyles();
  let location = useLocation();
  return (
    
    <div className="App">        
        <Nav />
        
        <Route exact path="/" component={MainScreen} />
        <ScrollToTop />
        {location.pathname !== "/" && <Container maxWidth="md" className={classes.root} >
          <Switch >
            <Route path="/book/search/:field" component={BookSearchResults} />
            <Route path="/book/showall" component={BooksScreen} />
            <Route path="/book/:id" component={BookScreen} />
            <Route path="/book" component={BookUploadScreen} />
            <Route path="/user/:id" component={UserScreen} />
            <Route component = {NotFound} />
        </Switch>
      </Container>}
    </div>
  );
}
