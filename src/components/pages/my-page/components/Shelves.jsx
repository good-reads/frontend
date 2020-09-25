import React from 'react';
import { useSelector } from 'react-redux';

import Shelf from './Shelf';

const Shelves = () => {
  const { shelves } = useSelector(({ shelf }) => shelf);
  return (
    <div>
      <h1>나의 서재</h1>
      {shelves.map(info => (
        <Shelf key={info.id} info={info} />
      ))}
    </div>
  );
};

export default Shelves;
