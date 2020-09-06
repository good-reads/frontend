import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import Logo from './components/Logo';
import Title from './components/Title';
import SearchContainer from './containers/SearchContainer';
import Picture from './components/Picture';

const Navigation = ({ isSignIn }) => {
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
              <>
                <Grid item xs={7} style={{ background: 'DARKCYAN' }}>
                  <Title />
                </Grid>
                <Grid item xs={1} style={{ background: 'DARKCYAN' }}>
                  <button onClick={() => setIsSearchActive(true)}>🔍</button>
                </Grid>
              </>
            ) : (
              <Grid item xs={8} style={{ background: 'DARKCYAN' }}>
                <Title />
              </Grid>
            )}

            <Grid item xs={3} style={{ background: 'LIGHTSEAGREEN' }}>
              <button>로그인</button>
              <button>회원가입</button>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default Navigation;
