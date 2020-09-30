import React from 'react';
import { useSelector } from 'react-redux';

import Shelves from './components/Shelves';
import Profile from './components/Profile';

const MyPage = () => {
  const { activeComponent } = useSelector(({ tab }) => tab);

  return (
    <div className="my-page">
      {activeComponent === '0' && <Shelves />}
      {activeComponent === '1' && <Profile />}
    </div>
  );
};

export default MyPage;
