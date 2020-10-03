import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const SignInModal = ({ open, handleClose, signIn }) => {
  const [info, setInfo] = useState({
    email: '',
    password: '',
  });
  const { error } = useSelector(({ user }) => user);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    const result = await signIn(info);
  };

  const onChangeInfo = e =>
    setInfo({ ...info, [e.target.type]: e.target.value });

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="로그인">
      <DialogTitle className="modal" id="form-dialog-title">
        로그인
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="이메일"
          type="email"
          value={info.email}
          onChange={onChangeInfo}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          label="비밀번호"
          type="password"
          value={info.password}
          onChange={onChangeInfo}
          fullWidth
        />
        <span>{error}</span>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSignIn} color="primary">
          로그인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignInModal;
