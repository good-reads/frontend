import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

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
  signUpModalOpen,
  signUpModalClose,
  signInModalOpen,
  signInModalClose,
}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={1} style={{ background: 'TEAL' }}>
          <Logo />
        </Grid>
        {isSearchActive ? (
          <>
            <Grid item xs={10}>
              <SearchContainer />
            </Grid>
            <Grid item xs={1}>
              <button onClick={() => setIsSearchActive(false)}>X</button>
            </Grid>
          </>
        ) : (
          <>
            {isSignIn ? (
              // 로그인 중이라면,
              <>
                <Grid item xs={7} style={{ background: 'DARKCYAN' }}>
                  <Title />
                </Grid>
                <Grid item xs={1} style={{ background: 'DARKCYAN' }}>
                  <button onClick={() => setIsSearchActive(true)}>🔍</button>
                </Grid>
                <Grid item xs={3} style={{ background: 'LIGHTSEAGREEN' }}>
                  {isLoading ? (
                    <span>로딩중...</span>
                  ) : (
                    <>
                      <button onClick={() => signOut()}>로그아웃</button>
                      <Picture thumbnail={thumbnail} />
                    </>
                  )}
                </Grid>
              </>
            ) : (
              // 로그인중이 아니라면
              <>
                <Grid item xs={8} style={{ background: 'DARKCYAN' }}>
                  <Title />
                </Grid>
                <Grid item xs={3} style={{ background: 'LIGHTSEAGREEN' }}>
                  {isLoading ? (
                    <span>로딩중...</span>
                  ) : (
                    <>
                      <button onClick={() => signInModalOpen()}>로그인</button>
                      <button onClick={() => signUpModalOpen()}>
                        회원가입
                      </button>
                    </>
                  )}
                </Grid>
              </>
            )}
          </>
        )}
      </Grid>
      {signInIsOpen && (
        <SignInModal
          open={signInIsOpen}
          handleClose={signInModalClose}
          signIn={signIn}
        />
      )}
      {signUpIsOpen && (
        <SignUpModal
          open={signUpIsOpen}
          handleClose={signUpModalClose}
          signUp={signUp}
        />
      )}
    </div>
  );
};

export default Navigation;
