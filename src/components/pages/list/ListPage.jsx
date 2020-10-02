import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Books from './components/Books';

const ListPage = () => {
  const { shelves } = useSelector(({ shelf }) => shelf);
  const list_id = localStorage.getItem('list_id');
  const [listName, setListName] = useState('');

  useEffect(() => {
    if (shelves[list_id]) {
      setListName(shelves[list_id].list_name);
    }
  }, [list_id, shelves]);

  return (
    <div className="list-page">
      {shelves[list_id] && (
        <div className="list-page__inner">
          <h1 className="list-page__shelf-name">#{listName}</h1>
          <Books list_id={list_id} />
        </div>
      )}
    </div>
  );
};

export default ListPage;
