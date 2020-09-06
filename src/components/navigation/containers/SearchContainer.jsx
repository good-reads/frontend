import React from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../../lib/useActions';

import Search from '../components/Search';
import { searchBooks } from '../../../modules/search';

const SearchContainer = () => {
  const { isLoading } = useSelector(({ search }) => search);
  const [onSearchBooks] = useActions([searchBooks], []);

  return <Search isLoading={isLoading} searchBooks={onSearchBooks} />;
};

export default SearchContainer;
