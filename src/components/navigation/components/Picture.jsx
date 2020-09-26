import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Picture = ({ thumbnail }) => {
  const history = useHistory();
  const classes = useStyles();

  const handleMoveToMyPage = () => {
    history.push('/mypage');
  };

  return (
    <Avatar
      onClick={handleMoveToMyPage}
      alt="profile"
      src={thumbnail}
      className={classes.small}
    />
  );
};

export default Picture;
