import Home from './Components/Home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Register/Register';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import { useCallback, useContext, useEffect } from 'react';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import MoviesOrShows from './Components/MoviesOrShows/MoviesOrShows';
import { CurrentUserContext } from './Context/CurrentUserContext';
import SearchResults from './Components/SearchResults/SearchResults';

function ForbiddenIfNotLoggedIn(props) {

  if(localStorage.getItem('token') === null) {
    return <Navigate to="/login" />
  } else {
    return props.children;
  }
}

function App() {

  const { decodeToken } = useContext(CurrentUserContext);

  const isLoggedIn = useCallback (
    () => {
    if (localStorage.getItem('token')) {
      decodeToken();
    }
  }, []);

  useEffect( () => {
    isLoggedIn();
  }, [isLoggedIn] );

  return <>

    <Navbar />

    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/home' element={<ForbiddenIfNotLoggedIn><Home /></ForbiddenIfNotLoggedIn>} />
      <Route path='/movieDetails' element={<ForbiddenIfNotLoggedIn><MovieDetails /></ForbiddenIfNotLoggedIn>} >
        <Route path=':type' element={<ForbiddenIfNotLoggedIn><MovieDetails /></ForbiddenIfNotLoggedIn>}>
          <Route path=':id' element={<ForbiddenIfNotLoggedIn><MovieDetails /></ForbiddenIfNotLoggedIn>} />
        </Route>
      </Route>
      <Route path='/movies' element={<ForbiddenIfNotLoggedIn><MoviesOrShows apiType={'movie'} /></ForbiddenIfNotLoggedIn>} />
      <Route path='/tv' element={<ForbiddenIfNotLoggedIn><MoviesOrShows apiType={'tv'} /></ForbiddenIfNotLoggedIn>} />
      <Route path='/search' element={<ForbiddenIfNotLoggedIn><SearchResults /></ForbiddenIfNotLoggedIn>}>
        <Route path=':query' element={<ForbiddenIfNotLoggedIn><SearchResults /></ForbiddenIfNotLoggedIn>} />
      </Route>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  </>
}

export default App;
