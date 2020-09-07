import React from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../../lib/useActions';

import Search from '../components/Search';
import { searchBooks, updateSearchKeyword } from '../../../modules/search';

const SearchContainer = () => {
  const { isLoading } = useSelector(({ search }) => search);
  const [onSearchBooks, onUpdateSearchKeyword] = useActions(
    [searchBooks, updateSearchKeyword],
    []
  );

  return (
    <Search
      isLoading={isLoading}
      searchBooks={onSearchBooks}
      updateSearchKeyword={onUpdateSearchKeyword}
    />
  );
};

export default SearchContainer;
