import React from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../../lib/useActions';

import Navigation from '../Navigation';
import { signIn, signUp, signOut } from '../../../modules/user';
import { modalActions } from '../../../modules/modal';

const NavigationContainer = () => {
  const { isSignIn, isLoading, informations } = useSelector(({ user }) => user);
  const { signUpIsOpen, signInIsOpen } = useSelector(({ modal }) => modal);

  const [onSignIn, onSignUp, onSignOut, onUpdateModalState] = useActions(
    [signIn, signUp, signOut, modalActions.setState],
    []
  );

  return (
    <Navigation
      thumbnail={informations.thumbnail}
      isSignIn={isSignIn}
      isLoading={isLoading}
      signIn={onSignIn}
      signUp={onSignUp}
      signOut={onSignOut}
      signInIsOpen={signInIsOpen}
      signUpIsOpen={signUpIsOpen}
      updateModalState={onUpdateModalState}
    />
  );
};

export default NavigationContainer;
