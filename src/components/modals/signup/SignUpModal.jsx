import React, { useState } from 'react';
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

  const onChangeInfo = e =>
    setInfo({ ...info, [e.target.name]: e.target.value });

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
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            signUp(info);
            handleClose();
          }}
          color="primary"
        >
          회원가입
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignUpModal;
