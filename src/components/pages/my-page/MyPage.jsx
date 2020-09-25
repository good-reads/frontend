import React from 'react';
import { useDispatch } from 'react-redux';

import Shelves from './components/Shelves';
import AddShelfModal from '../../modals/add-shelf/AddShelfModal';
import { modalActions } from '../../../modules/modal';

const MyPage = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Shelves />
      <button
        onClick={() =>
          dispatch(modalActions.setState({ addShelfIsOpen: true }))
        }
      >
        서재 추가하기
      </button>
      <AddShelfModal />
    </div>
  );
};

export default MyPage;
