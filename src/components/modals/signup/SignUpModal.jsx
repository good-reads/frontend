import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const SignUpModal = ({ open, handleClose, signUp }) => {
  const [info, setInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeInfo = e =>
    setInfo({ ...info, [e.target.name]: e.target.value });

  const handleSignUp = async () => {
    const { status, data } = await signUp(info);
    if (status === 200) {
      handleClose();
    } else {
      const { name, email, password } = data;
      setErrorMessages({
        name,
        email,
        password,
      });
    }
  };

  useEffect(() => {
    console.log('hi>>', errorMessages);
  }, [errorMessages]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="로그인">
      <DialogTitle id="form-dialog-title">회원가입</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="이름"
          type="text"
          name="name"
          value={info.name}
          onChange={onChangeInfo}
          fullWidth
        />
        <span>{errorMessages.name}</span>

        <TextField
          autoFocus
          margin="dense"
          label="이메일"
          type="email"
          name="email"
          value={info.email}
          onChange={onChangeInfo}
          fullWidth
        />
        <span>{errorMessages.email}</span>

        <TextField
          autoFocus
          margin="dense"
          label="비밀번호"
          type="password"
          name="password"
          value={info.password}
          onChange={onChangeInfo}
          fullWidth
        />
        <span>{errorMessages.password}</span>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSignUp} color="primary">
          회원가입
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignUpModal;
