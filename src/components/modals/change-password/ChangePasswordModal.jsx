import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { modalActions } from '../../../modules/modal';
import { userActions } from '../../../modules/user';

const ChangePasswordModal = () => {
  const dispatch = useDispatch();
  const open = useSelector(({ modal }) => modal.changePasswordIsOpen);
  const { error } = useSelector(({ user }) => user);
  const [passwords, setPasswords] = useState({
    password: '',
    passwordCheck: '',
  });

  const handleClose = () => {
    const { password } = passwords;
    dispatch(userActions.changePassword(password));
  };

  const onChangePasswords = e => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  useEffect(() => {
    dispatch(userActions.resetErrorMessage());
  }, [dispatch]);

  useEffect(() => {
    const { password, passwordCheck } = passwords;
    if (password === passwordCheck) dispatch(userActions.setErrorMessage(''));
    else dispatch(userActions.setErrorMessage('똑같이 입력해주세요'));
  }, [dispatch, passwords]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">비밀번호 변경하기</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="password"
            label="새로운 비밀번호"
            type="password"
            fullWidth
            onChange={onChangePasswords}
          />
          <TextField
            autoFocus
            margin="dense"
            name="passwordCheck"
            label="새로운 비밀번호 확인"
            type="password"
            fullWidth
            onChange={onChangePasswords}
          />
          <span>{error}</span>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            변경하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangePasswordModal;
