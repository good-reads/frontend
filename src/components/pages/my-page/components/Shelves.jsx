import React, { useRef } from 'react';

import Shelf from './Shelf';

const Shelves = () => {
  const shelves = useRef(JSON.parse(localStorage.getItem('shelves')));
  return (
    <div>
      <h1>나의 서재</h1>
      {shelves.current.map(info => (
        <Shelf key={info.id} info={info} />
      ))}
    </div>
  );
};

export default Shelves;
