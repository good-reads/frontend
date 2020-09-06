import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

const BASE_URL =
  'http://ec2-54-180-154-184.ap-northeast-2.compute.amazonaws.com/api/books/search/books';

// initial state
const initialState = {
  isLoading: false,
  keyword: '',
  books: [],
};

// action type
const UPDATE_SEARCH_KEYWORD = 'search/UPDATE_SEARCH_KEYWORD';
const SEARCH_BOOK_REQUEST = 'search/SEARCH_BOOK_REQUEST';
const SEARCH_BOOK_SUCCESS = 'search/SEARCH_BOOK_SUCCESS';
const SEARCH_BOOK_FAILURE = 'search/SEARCH_BOOK_FAILURE';

// action creator(sync)
const updateSearchKeyword = createAction(
  UPDATE_SEARCH_KEYWORD,
  keyword => keyword
);
const searchBookRequest = createAction(SEARCH_BOOK_REQUEST);
const searchBookSuccess = createAction(SEARCH_BOOK_SUCCESS, books => books);
const searchBookFailure = createAction(SEARCH_BOOK_FAILURE);

// action creator(async)
const searchBooks = keyword => {
  const token = localStorage.getItem('authorization');
  const findBy = async key =>
    axios(`${BASE_URL}/`, {
      params: {
        [key]: keyword,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    });

  return async (dispatch, getState) => {
    dispatch(searchBookRequest());

    try {
      const results = await Promise.all([
        findBy('author'),
        findBy('title'),
      ]).then(result => result.map(({ data }) => data));

      const _books = {};
      const books = [];

      results.forEach(result => {
        result.forEach(
          ({ isbn, title, author, rate, cover }) =>
            (_books[isbn] = { title, author, rate, cover, isbn })
        );
      });

      Object.keys(_books).map(key => books.push(_books[key]));
      dispatch(searchBookSuccess(books));
    } catch (error) {
      const { status, statusText } = error.response;
      console.log(status, statusText);
      dispatch(searchBookFailure());
    }
  };
};

export { searchBooks };

// reducer
const searchReducer = handleActions(
  {
    [UPDATE_SEARCH_KEYWORD]: (prevState, action) => ({
      ...prevState,
      keyword: action.payload,
    }),
    [SEARCH_BOOK_REQUEST]: (prevState, action) => ({
      ...prevState,
      isLoading: true,
    }),
    [SEARCH_BOOK_SUCCESS]: (prevState, action) => ({
      ...prevState,
      books: action.payload,
      isLoading: false,
    }),
    [SEARCH_BOOK_FAILURE]: (prevState, action) => ({
      ...prevState,
      isLoading: false,
    }),
  },
  initialState
);

export default searchReducer;
