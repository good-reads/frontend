import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Shelves from './components/Shelves';
import Profile from './components/Profile';
import AddShelfModal from '../../modals/add-shelf/AddShelfModal';
import { modalActions } from '../../../modules/modal';

const MyPage = () => {
  const dispatch = useDispatch();
  const { activeComponent } = useSelector(({ tab }) => tab);

  return (
    <div>
      {activeComponent === '0' && <Shelves />}
      {activeComponent === '1' && <Profile />}
    </div>
  );
};

export default MyPage;
