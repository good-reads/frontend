import React from 'react';
import { useSelector } from 'react-redux';

import SearchList from '../components/SearchList';

const SearchListContainer = () => {
  const { books, keyword } = useSelector(({ search }) => search);
  return <SearchList books={books} keyword={keyword} />;
};

export default SearchListContainer;
