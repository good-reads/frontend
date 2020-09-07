import React from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../../lib/useActions';

import Navigation from '../Navigation';
import { signIn, signUp, signOut } from '../../../modules/user';
import {
  signUpModalOpen,
  signUpModalClose,
  signInModalOpen,
  signInModalClose,
} from '../../../modules/modal';

const NavigationContainer = () => {
  const { isSignIn, isLoading, informations } = useSelector(({ user }) => user);
  const { signUpIsOpen, signInIsOpen } = useSelector(({ modal }) => modal);

  const [
    onSignIn,
    onSignUp,
    onSignOut,
    onSignUpModalOpen,
    onSignUpModalClose,
    onSignInModalOpen,
    onSignInModalClose,
  ] = useActions(
    [
      signIn,
      signUp,
      signOut,
      signUpModalOpen,
      signUpModalClose,
      signInModalOpen,
      signInModalClose,
    ],
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
      signUpModalOpen={onSignUpModalOpen}
      signUpModalClose={onSignUpModalClose}
      signInModalOpen={onSignInModalOpen}
      signInModalClose={onSignInModalClose}
    />
  );
};

export default NavigationContainer;
