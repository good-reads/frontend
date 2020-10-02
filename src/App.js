import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NavigationContainer from './components/navigation/containers/NavigationContainer';
import MyPageTab from './components/tabs/MyPageTab';
import MainPage from './components/pages/main/MainPage';
import SearchPage from './components/pages/search/SearchPage';
import DetailPage from './components/pages/detail/DetailPage';
import NewBookModal from './components/modals/new-book/NewBookModal';
import MyPage from './components/pages/my-page/MyPage';
import ListPage from './components/pages/list/ListPage';
import AddShelfModal from './components/modals/add-shelf/AddShelfModal';
import { userActions } from './modules/user';
import { modalActions } from './modules/modal';

import './styles/reset.css';
import './styles/common.css';
import './styles/App.css';
import './styles/Main.css';
import './styles/_MyPage.scss';
import './styles/Navigation.css';
import './styles/_SearchPage.scss';
import './styles/_DetailPage.scss';
import './styles/_ListPage.scss';
import './styles/_Review.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authorization = localStorage.getItem('authorization');
    if (!!authorization) dispatch(userActions.maintain());
  }, [dispatch]);

  return (
    <div className="container">
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
            <NewBookModal
              handleClose={() =>
                dispatch(modalActions.setState({ addNewBookIsOpen: false }))
              }
            />
          </Route>
          <Route path="/mypage" exact>
            <MyPageTab />
            <MyPage />
          </Route>
          <Route path="/list" exact>
            <ListPage />
          </Route>
        </Switch>
      </Router>
      <button
        onClick={() =>
          dispatch(modalActions.setState({ addNewBookIsOpen: true }))
        }
      >
        새로운 책 추가하기
      </button>
      <button
        onClick={() =>
          dispatch(modalActions.setState({ addShelfIsOpen: true }))
        }
      >
        서재 추가하기
      </button>
      <NewBookModal
        handleClose={() =>
          dispatch(modalActions.setState({ addNewBookIsOpen: false }))
        }
      />
      <AddShelfModal />
    </div>
  );
};

export default App;
