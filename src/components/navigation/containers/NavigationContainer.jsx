import React from 'react';
import { useSelector } from 'react-redux';

import Navigation from '../Navigation';

const NavigationContainer = () => {
  const { isSignIn, isLoading } = useSelector(({ user }) => user);
  return <Navigation isSignIn={isSignIn} isLoading={isLoading} />;
};

export default NavigationContainer;
