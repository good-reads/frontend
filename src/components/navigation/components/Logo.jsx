import React from 'react';
import { useHistory } from 'react-router-dom';

const Logo = () => {
  const history = useHistory();

  const handleMoveToMain = () => history.push('/');

  return <div onClick={handleMoveToMain}>📚</div>;
};

export default Logo;
