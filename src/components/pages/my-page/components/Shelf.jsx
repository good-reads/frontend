import React from 'react';
import { withRouter } from 'react-router-dom';

const Shelf = ({ info, history }) => {
  const { id, owner_id, list_name, booklist } = info;
  const showDetails = () => {
    history.push({
      pathname: '/list',
      state: { list_id: id, booklist, list_name },
    });
    localStorage.setItem('list_id', id);
  };
  return (
    <button className="shelf" onClick={showDetails}>
      # {list_name}
    </button>
  );
};

export default withRouter(Shelf);
