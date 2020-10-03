import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { bookActions } from '../../../modules/book';
import * as Icons from '../../icons/Icons';

const NewBookModal = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { error } = useSelector(({ book }) => book);
  const { addNewBookIsOpen } = useSelector(({ modal }) => modal);
  const [src, setSrc] = useState('');
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    cover: '',
    pubdate: '',
    isbn: '',
    description: '',
    publisher: '',
  });

  const onChangeBookData = e => {
    // isbn의 경우 무조건 숫자만 들어가도록 해야 함
    const { name, value } = e.target;
    const regex = /[^0-9]/g;
    if (name === 'isbn' && value.search(regex) > -1) return;
    setBookData({ ...bookData, [name]: value });
  };

  const changeImage = e => {
    // https://stackoverflow.com/questions/3814231/loading-an-image-to-a-img-from-input-file
    const target = e.target || window.event.srcElement,
      files = target.files;

    if (FileReader && files && files.length) {
      setBookData({ ...bookData, cover: files });

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
    let isValid = true;
    const { isbn } = bookData;

    // isbn은 10자 이상
    if (isbn.length >= 10) {
      Object.keys(bookData).forEach(key => {
        if (bookData[key].length === 0) isValid = false;
      });
    } else {
      isValid = false;
    }

    // 책 제목/작가/출판사/날짜/설명 은 비면 안됨
    if (isValid) {
      dispatch(bookActions.addNewBook(bookData));
    } else {
      alert('모든 정보를 올바르게 입력해주세요');
    }
  };

  return (
    <Dialog
      open={addNewBookIsOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle className="modal" id="form-dialog-title">
        책 추가하기
      </DialogTitle>
      <DialogContent>
        <div className="new-book-modal__upload-image">
          <div className="new-book-modal__inner">
            {src === '' ? (
              <img className="upload-image__image" />
            ) : (
              <img className="upload-image__image" src={src} />
            )}

            <label className="upload-image__upload" htmlFor="book-thumbnail">
              <Icons.ImageIcon />
            </label>
            <input
              hidden
              onChange={changeImage}
              id="book-thumbnail"
              type="file"
              accept=".jpg,.png"
            />
          </div>
        </div>

        <TextField
          autoFocus
          margin="dense"
          label="ISBN"
          type="text"
          name="isbn"
          fullWidth
          value={bookData.isbn}
          onChange={onChangeBookData}
          inputProps={{
            maxLength: 13,
          }}
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
          label="출판사"
          type="text"
          name="publisher"
          fullWidth
          value={bookData.publisher}
          onChange={onChangeBookData}
        />
        <TextField
          autoFocus
          margin="dense"
          type="date"
          name="pubdate"
          fullWidth
          value={bookData.pubdate}
          onChange={onChangeBookData}
          defaultValue="2020-04-06"
        />
        <TextField
          autoFocus
          margin="dense"
          label="간단한 설명"
          rows={4}
          type="text"
          name="description"
          multiline
          fullWidth
          value={bookData.description}
          onChange={onChangeBookData}
        />
        <span>{error}</span>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddNewBook} color="primary">
          책 추가하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewBookModal;
