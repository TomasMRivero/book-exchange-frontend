import './App.css';

import { Switch, Route, useLocation } from 'react-router-dom'

import { Redirect } from 'react-router';

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
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setAuthenticated, setAuthUser } from './redux/actions';
import RegisterForm from './components/RegisterForm';

const useStyles = makeStyles((theme) => ({
  root:{
    background: "#fff",
    minHeight:'100vh',
    padding: 0,
  }
}));

export default function App() {

  const dispatch = useDispatch()

  const classes=useStyles();
  let location = useLocation();

  const isAuthenticated = useSelector(state => state.models.authenticated);
  const authorization = axios.defaults.headers.common.authorization;

  const loggedIn = false
  
  async function getAuthUser(){
    await axios.get('/user/me').then(
      response => {
        const user = response.data;
        dispatch(setAuthUser(user));
      }).catch(error => {
        console.error(error);
        console.error(error.response);
      })    
  }

  useEffect(() => {
    if(authorization !== null){
      dispatch(setAuthenticated());
      getAuthUser();
      console.log('fx');
    }
  }, [dispatch]);

  return (
    
    <div className="App">        
        <Nav />
        
        <Route exact path="/" component={MainScreen} />
        <ScrollToTop />
        {location.pathname !== "/"  && <Container maxWidth="md" className={classes.root} >
          <Switch >
            <Route path="/login" >
              {!isAuthenticated ? <LoginForm /> : <Redirect to="/" />}
            </Route>
            <Route path="/register" >
              {!isAuthenticated ? <RegisterForm /> : <Redirect to="/" />}
            </Route>
            <Route path="/book/search/:field" component={BookSearchResults} />
            <Route path="/book/showall" component={BooksScreen} />
            <Route path="/book/:id" component={BookScreen} />
            <Route exact path="/book" >
              {isAuthenticated ? <BookUploadScreen /> : <Redirect to="/login" />}
            </Route>
            <Route path="/user/:id" component={UserScreen} />
            <Route component = {NotFound} />
        </Switch>
      </Container>}
    </div>
  );
}
