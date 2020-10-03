import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const LoadingIcon = () => {
  return <FontAwesomeIcon icon={['fas', 'spinner']} spin />;
};

export const SearchIcon = () => {
  return <FontAwesomeIcon icon={['fas', 'search']} />;
};

export const CloseIcon = () => {
  return <FontAwesomeIcon icon={['fas', 'times']} />;
};

export const SignOutIcon = () => {
  return <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />;
};

export const SignInIcon = () => {
  return <FontAwesomeIcon icon={['fas', 'sign-in-alt']} />;
};

export const SignUpIcon = () => {
  return <FontAwesomeIcon icon={['fas', 'user-plus']} />;
};

export const SaveIcon = () => {
  return <FontAwesomeIcon icon={['fas', 'save']} />;
};

export const EditIcon = () => {
  return <FontAwesomeIcon icon={['fas', 'pencil-alt']} />;
};

export const PlusIcon = () => {
  return <FontAwesomeIcon icon={['fas', 'plus']} />;
};

export const StarIcon = ({ onClick }) => {
  return <FontAwesomeIcon onClick={onClick} icon={['fas', 'star']} />;
};

export const StarBorderIcon = ({ onClick }) => {
  return <FontAwesomeIcon onClick={onClick} icon={['far', 'star']} />;
};

export const BarsIcon = () => {
  return <FontAwesomeIcon icon={['fas', 'bars']} />;
};

export const BookIcon = () => {
  return <FontAwesomeIcon icon={['fas', 'book']} />;
};

export const ListIcon = () => {
  return <FontAwesomeIcon icon={['fas', 'list-ul']} />;
};
