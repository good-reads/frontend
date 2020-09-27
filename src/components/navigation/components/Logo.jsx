import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LogoIcon = () => {
  return <FontAwesomeIcon icon={['fas', 'book']} />;
};

const Logo = () => {
  const history = useHistory();

  const handleMoveToMain = () => history.push('/');

  return (
    <span onClick={handleMoveToMain}>
      <LogoIcon />
    </span>
  );
};

export default Logo;
