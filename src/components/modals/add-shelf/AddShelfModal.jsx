import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';

import { modalActions } from '../../../modules/modal';
import { shelfActions } from '../../../modules/shelf';

const AddShelfModal = () => {
  const [shelfName, setShelfName] = useState('');
  const dispatch = useDispatch();
  const { addShelfIsOpen } = useSelector(({ modal }) => modal);
  const { error } = useSelector(({ shelf }) => shelf);

  const handleClose = () => {
    dispatch(modalActions.setState({ addShelfIsOpen: false }));
    setShelfName('');
  };

  const onChangeShelfName = e => {
    setShelfName(e.target.value);
  };

  const handleAddShelf = async () => {
    dispatch(shelfActions.addShelf(shelfName));
    setShelfName('');
  };

  return (
    <Dialog
      open={addShelfIsOpen}
      onClose={handleClose}
      aria-labelledby="서재 추가하기"
    >
      <DialogTitle id="form-dialog-title">서재 추가하기</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="이름"
          type="text"
          name="shelf"
          value={shelfName}
          onChange={onChangeShelfName}
          fullWidth
        />
        <span>{error}</span>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddShelf} color="primary">
          추가하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddShelfModal;
