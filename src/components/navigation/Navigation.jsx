import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Logo from './components/Logo';
import Title from './components/Title';
import SearchContainer from './containers/SearchContainer';
import Picture from './components/Picture';
import SignInModal from '../modals/signin/SignInModal';
import SignUpModal from '../modals/signup/SignUpModal';

const Navigation = ({
  thumbnail,
  isSignIn,
  isLoading,
  signIn,
  signUp,
  signOut,
  signInIsOpen,
  signUpIsOpen,
  updateModalState,
}) => {
  const history = useHistory();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSignOut = () => {
    signOut();
    history.push('/');
  };

  return (
    <div className="navigation" style={{ background: 'yellowgreen' }}>
      <div className="navigation__logo">
        <Logo />
      </div>
      {isSearchActive ? (
        <div className="navigation__search">
          <SearchContainer />
          <button
            className="search__button"
            onClick={() => setIsSearchActive(false)}
          >
            X
          </button>
        </div>
      ) : (
        <>
          {isSignIn ? (
            // 로그인 중이라면,
            <div className="navigation__inner navigation__inner--signin">
              <div className="navigation__title">
                <Title />
              </div>

              <div className="navigation__user">
                <button onClick={() => setIsSearchActive(true)}>🔍</button>
                {isLoading ? (
                  <span>로딩중...</span>
                ) : (
                  <>
                    <button onClick={() => handleSignOut()}>로그아웃</button>
                    <Picture thumbnail={thumbnail} />
                  </>
                )}
              </div>
            </div>
          ) : (
            // 로그인중이 아니라면
            <div className="navigation__inner navigation__inner--signout">
              <div className="navigation__title">
                <Title />
              </div>
              <div className="navigation__user">
                {isLoading ? (
                  <span>로딩중...</span>
                ) : (
                  <>
                    <button
                      onClick={() => updateModalState({ signInIsOpen: true })}
                    >
                      로그인
                    </button>
                    <button
                      onClick={() => updateModalState({ signUpIsOpen: true })}
                    >
                      회원가입
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
      {signInIsOpen && (
        <SignInModal
          open={signInIsOpen}
          handleClose={() => updateModalState({ signInIsOpen: false })}
          signIn={signIn}
        />
      )}
      {signUpIsOpen && (
        <SignUpModal
          open={signUpIsOpen}
          handleClose={() => updateModalState({ signUpIsOpen: false })}
          signUp={signUp}
        />
      )}
    </div>
  );
};

export default Navigation;
