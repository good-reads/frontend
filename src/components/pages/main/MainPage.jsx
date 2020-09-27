import React from 'react';

import { getRandom } from '../../../lib/wiseSaying';

const MainPage = () => {
  const { text, by } = getRandom();
  return (
    <div className="main-page">
      <ol className="main-page__wise-saying">
        {text.split('<br/>').map((line, idx) => (
          <li key={idx} className="wise-saying__line no-drag">
            {line}
          </li>
        ))}
        <br />
        <span className="wise-saying__by no-drag">{by}</span>
      </ol>
    </div>
  );
};

export default MainPage;
