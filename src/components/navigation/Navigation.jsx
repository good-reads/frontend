import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Logo from './components/Logo';
import Title from './components/Title';
import SearchContainer from './containers/SearchContainer';
import Picture from './components/Picture';
import SignInModal from '../modals/signin/SignInModal';
import SignUpModal from '../modals/signup/SignUpModal';
import * as Icons from '../icons/Icons';

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
    <div className="navigation">
      <div className="navigation__logo">
        <Logo />
      </div>
      {isSearchActive ? (
        <div className="navigation__search">
          <SearchContainer />
          <button
            className="search__close"
            onClick={() => setIsSearchActive(false)}
          >
            <Icons.CloseIcon />
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
                <button
                  className="user__search"
                  onClick={() => setIsSearchActive(true)}
                >
                  <Icons.SearchIcon />
                </button>
                {isLoading ? (
                  <button>
                    {/* <LoadingIcon /> */}
                    <Icons.LoadingIcon />
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleSignOut()}>
                      <Icons.SignOutIcon />
                    </button>
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
                  <button>
                    <Icons.LoadingIcon />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => updateModalState({ signInIsOpen: true })}
                    >
                      <Icons.SignInIcon />
                    </button>
                    <button
                      className="user__signup"
                      onClick={() => updateModalState({ signUpIsOpen: true })}
                    >
                      <Icons.SignUpIcon />
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
