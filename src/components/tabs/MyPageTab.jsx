import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { tabActions } from '../../modules/tab';

const Tab = ({ index, activeIndex, text, onClick }) => {
  return (
    <button
      className={`tab__item ${index === activeIndex && `tab__item--selected`}`}
      name={index}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const MyPageTab = () => {
  const dispatch = useDispatch();
  const activeIndex = Number(useSelector(({ tab }) => tab.activeComponent));
  const handleChangeTab = e => {
    dispatch(tabActions.setActiveComponentIndex(e.target.name));
  };
  return (
    <div className="my-page__tab">
      <Tab
        index={0}
        activeIndex={activeIndex}
        text="내 서재"
        onClick={handleChangeTab}
      />
      <Tab
        index={1}
        activeIndex={activeIndex}
        text="내 정보"
        onClick={handleChangeTab}
      />
    </div>
  );
};

export default MyPageTab;
