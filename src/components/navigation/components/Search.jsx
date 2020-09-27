import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import * as Icons from '../../icons/Icons';

const Search = ({ isLoading, searchBooks, updateSearchKeyword, history }) => {
  const [keyword, setKeyword] = useState('');
  const handleSearch = e => {
    e.preventDefault();
    searchBooks(keyword);
    updateSearchKeyword(keyword);
    history.push('/search');
  };
  return (
    <form className="search" onSubmit={handleSearch}>
      <input
        className="search__input"
        type="text"
        placeholder="찾고 싶은 책을 입력해주세요"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      {isLoading && <Icons.LoadingIcon />}
    </form>
  );
};

export default withRouter(Search);
