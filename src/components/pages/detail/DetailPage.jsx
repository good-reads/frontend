import React from 'react';
import { withRouter } from 'react-router-dom';

import BookDetail from './components/BookDetail';

const DetailPage = ({ history }) => {
  // const { isbn } = history.location.state;

  return (
    <div>
      <BookDetail info={history.location.state} />
    </div>
  );
};

export default withRouter(DetailPage);
