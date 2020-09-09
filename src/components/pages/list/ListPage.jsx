import React from 'react';
import { withRouter } from 'react-router-dom';

const ListPage = ({ history }) => {
  const list_id = history.location.state.id;
  console.log(list_id);
  return <div>ListPage</div>;
};

export default withRouter(ListPage);
