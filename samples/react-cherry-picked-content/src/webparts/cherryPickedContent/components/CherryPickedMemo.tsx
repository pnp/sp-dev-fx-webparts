import * as React from 'react';

const CherryPickedDiv = ({ htmlFragment }) =>
  <div ref={ref => { if (ref) { ref.innerHTML = ""; ref.appendChild(document.createRange().createContextualFragment(htmlFragment)); } }}>
  </div>;

const CherryPickedMemo = React.memo(CherryPickedDiv);

export default CherryPickedMemo;