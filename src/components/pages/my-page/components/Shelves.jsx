import React from 'react';
import { useSelector } from 'react-redux';

import Shelf from './Shelf';

const Shelves = () => {
  const { shelves } = useSelector(({ shelf }) => shelf);
  return (
    <div>
      <h1>나의 서재</h1>
      {Object.keys(shelves).map(idx => (
        <Shelf key={shelves[idx].id} info={shelves[idx]} />
      ))}
    </div>
  );
};

export default Shelves;
