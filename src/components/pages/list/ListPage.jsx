import React from 'react';
import { withRouter } from 'react-router-dom';

import Books from './components/Books';

const ListPage = ({ history }) => {
  console.log(history.location.state);
  const { list_id, booklist, list_name } = history.location.state;
  return (
    <div>
      <h1>#{list_name}</h1>
      <Books list_id={list_id} booklist={booklist} />
    </div>
  );
};

export default withRouter(ListPage);
