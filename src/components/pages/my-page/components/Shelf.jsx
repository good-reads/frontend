import React from 'react';
import { withRouter } from 'react-router-dom';

const Shelf = ({ info, history }) => {
  const { id, owner_id, list_name } = info;
  const showDetails = () => {
    history.push({ pathname: '/list', state: { id } });
  };
  return <button onClick={showDetails}># {list_name}</button>;
};

export default withRouter(Shelf);
