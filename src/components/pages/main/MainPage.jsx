import React from 'react';

import { getRandom } from '../../../lib/wiseSaying';

const MainPage = () => {
  const { text, by } = getRandom();
  return (
    <div>
      <div>
        {text.split('<br/>').map((line, idx) => (
          <div key={idx}>
            <span>{line}</span>
          </div>
        ))}
      </div>
      <span>{by}</span>
    </div>
  );
};

export default MainPage;
