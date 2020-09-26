import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateProfile, resetErrorMessage } from '../../../../modules/user';

const Modify = ({ keyword, start }) => {
  const dispatch = useDispatch();

  const { error } = useSelector(({ user }) => user);
  const [isReadyToSave, setIsReadyToSave] = useState(false);
  const [modifyData, setModifyData] = useState(start);

  useEffect(() => {
    dispatch(resetErrorMessage());
  }, [dispatch]);

  const onChangeModifydata = e => {
    setModifyData(e.target.value);
  };

  const handleModify = () => {
    if (isReadyToSave) {
      dispatch(updateProfile({ [keyword]: modifyData }));
    }
    setIsReadyToSave(!isReadyToSave);
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

  return (
    <div>
      {thumbnail && <img alt="프로필 이미지" src={thumbnail}></img>}
      {email && <Modify keyword="email" start={email} />}
      {name && <Modify keyword="name" start={name} />}

      {/* <button>비밀번호 변경하기</button> */}
    </div>
  );
};

export default Profile;
