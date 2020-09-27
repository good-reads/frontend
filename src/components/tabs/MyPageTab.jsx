import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { tabActions } from '../../modules/tab';

const MyPageTab = () => {
  const dispatch = useDispatch();
  const handleChangeTab = e => {
    console.log(e.target.name);
    dispatch(tabActions.setActiveComponentIndex(e.target.name));
  };
  return (
    <div>
      <button name={0} onClick={handleChangeTab}>
        @@내 서재@@
      </button>
      <button name={1} onClick={handleChangeTab}>
        @@내 정보@@
      </button>
    </div>
  );
};

export default MyPageTab;
