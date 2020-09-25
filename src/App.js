import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NavigationContainer from './components/navigation/containers/NavigationContainer';
import MainPage from './components/pages/main/MainPage';
import SearchPage from './components/pages/search/SearchPage';
import DetailPage from './components/pages/detail/DetailPage';
import NewBookPage from './components/pages/new-book/NewBookPage';
import MyPage from './components/pages/my-page/MyPage';
import ListPage from './components/pages/list/ListPage';
import './css/reset.css';
import { maintain } from './modules/user';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(maintain());
  }, [dispatch]);
  return (
    <div>
      <Router>
        <Link to="/">Main/</Link>
        <Link to="/search">Search/</Link>
        <Link to="/detail">Detail/</Link>
        <Link to="/new-book">New-Book/</Link>
        <Link to="/mypage">My Page/</Link>
        <Link to="/list">List</Link>

        <NavigationContainer />

        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/search" exact>
            <SearchPage />
          </Route>
          <Route path="/detail" exact>
            <DetailPage />
          </Route>
          <Route path="/new-book" exact>
            <NewBookPage />
          </Route>
          <Route path="/mypage" exact>
            <MyPage />
          </Route>
          <Route path="/list" exact>
            <ListPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
