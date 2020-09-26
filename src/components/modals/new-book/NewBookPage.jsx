import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { bookActions } from '../../../modules/book';

const NewBookPage = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { addNewBookIsOpen } = useSelector(({ modal }) => modal);
  const [src, setSrc] = useState('');
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    intro: '',
    thumbnail: '',
    img: '',
  });

  const onChangeBookData = e => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const changeImage = e => {
    // https://stackoverflow.com/questions/3814231/loading-an-image-to-a-img-from-input-file
    const target = e.target || window.event.srcElement,
      files = target.files;

    if (FileReader && files && files.length) {
      setBookData({ ...bookData, img: files, thumbnail: files });

      const fr = new FileReader();
      fr.onload = function() {
        setSrc(fr.result);
      };
      fr.readAsDataURL(files[0]);
    }

    // Not supported
    else {
      console.log('file reader not support');
    }
  };

  const handleAddNewBook = () => {
    dispatch(bookActions.addNewBook(bookData));
  };

  return (
    <div>
      <Dialog
        open={addNewBookIsOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">책 추가하기</DialogTitle>
        <DialogContent>
          <img alt="img" src={src}></img>
          <label htmlFor="book-thumbnail">📷</label>
          <input
            onChange={changeImage}
            id="book-thumbnail"
            type="file"
            accept=".jpg,.png"
          />

          <TextField
            autoFocus
            margin="dense"
            label="책 제목"
            type="text"
            name="title"
            fullWidth
            value={bookData.title}
            onChange={onChangeBookData}
          />
          <TextField
            autoFocus
            margin="dense"
            label="작가"
            type="text"
            name="author"
            fullWidth
            value={bookData.author}
            onChange={onChangeBookData}
          />
          <TextField
            autoFocus
            margin="dense"
            label="간단한 설명"
            rows={4}
            type="text"
            name="intro"
            multiline
            fullWidth
            value={bookData.intro}
            onChange={onChangeBookData}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddNewBook} color="primary">
            책 추가하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewBookPage;
