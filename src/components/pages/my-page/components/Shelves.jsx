import React from 'react';
import { useSelector } from 'react-redux';

import Shelf from './Shelf';

const Shelves = () => {
  const { shelves } = useSelector(({ shelf }) => shelf);
  return (
    <div>
      <h1>나의 서재</h1>
      {Object.keys(shelves).map(id => (
        <Shelf key={shelves[id].id} info={shelves[id]} />
      ))}
    </div>
  );
};

export default Shelves;