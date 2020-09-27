import React from 'react';
import { useHistory } from 'react-router-dom';

const Logo = () => {
  const history = useHistory();

  const handleMoveToMain = () => history.push('/');

  return <span onClick={handleMoveToMain}>📚</span>;
};

export default Logo;
