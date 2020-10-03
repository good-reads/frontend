import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { shelfActions } from '../../../../modules/shelf';
import * as Icons from '../../../icons/Icons';

const Shelf = ({ info, history }) => {
  const dispatch = useDispatch();
  const { id, owner_id, list_name, booklist } = info;
  const showDetails = () => {
    history.push({
      pathname: '/list',
      state: { list_id: id, booklist, list_name },
    });
    localStorage.setItem('list_id', id);
  };

  const removeShelf = async () => {
    dispatch(shelfActions.removeShelf({ list_id: id }));
  };
  return (
    <div className="shelf">
      <button className="shelf__item" onClick={showDetails}>
        # {list_name}
      </button>
      <button onClick={removeShelf} className="shelf__remove">
        <Icons.CloseIcon />
      </button>
    </div>
  );
};

export default withRouter(Shelf);
