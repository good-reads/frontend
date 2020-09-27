import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../../../modules/user';
import ChangePasswordModal from '../../../modals/change-password/ChangePasswordModal';
import { modalActions } from '../../../../modules/modal';

const Modify = ({ keyword, start }) => {
  const dispatch = useDispatch();

  const { error } = useSelector(({ user }) => user);
  const [isReadyToSave, setIsReadyToSave] = useState(false);
  const [modifyData, setModifyData] = useState(start);

  const onChangeModifydata = e => {
    setModifyData(e.target.value);
  };

  const handleModify = () => {
    if (isReadyToSave) {
      dispatch(
        userActions.updateProfile({
          [keyword]: modifyData,
          cb: () => setIsReadyToSave(false),
        })
      );
    } else {
      dispatch(userActions.resetErrorMessage());
      setIsReadyToSave(true);
    }
  };

  return (
    <>
      {!isReadyToSave && (
        <div>
          <button onClick={handleModify}>수정</button>
          <span>{start}</span>
        </div>
      )}
      {isReadyToSave && (
        <div>
          <button onClick={handleModify}>저장</button>
          <input
            type="text"
            placeholder={start}
            onChange={onChangeModifydata}
          />
          <span>{error}</span>
        </div>
      )}
    </>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const { name, thumbnail, email } = useSelector(
    ({ user }) => user.informations
  );
  const [src, setSrc] = useState(thumbnail);

  useEffect(() => {
    setSrc(thumbnail);
  }, [thumbnail]);

  const changeImage = e => {
    // https://stackoverflow.com/questions/3814231/loading-an-image-to-a-img-from-input-file
    const target = e.target || window.event.srcElement,
      files = target.files;

    if (FileReader && files && files.length) {
      dispatch(userActions.updateProfile({ thumbnail: files }));

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

  return (
    <div>
      {src && (
        <>
          <img alt="프로필 이미지" src={src} />
          <label htmlFor="profile-thumbnail">📷</label>
          <input
            onChange={changeImage}
            type="file"
            accept=".jpg,.png"
            id="profile-thumbnail"
          />
        </>
      )}
      {email && <Modify keyword="email" start={email} />}
      {name && <Modify keyword="name" start={name} />}

      <button
        onClick={() =>
          dispatch(modalActions.setState({ changePasswordIsOpen: true }))
        }
      >
        비밀번호 변경하기
      </button>
      <ChangePasswordModal />
    </div>
  );
};

export default Profile;
