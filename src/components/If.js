import React from 'react'

function If({condition, els, children}) {
  if (condition) {
    return children;
  } else if (els) {
    return els;
  } else {
    return <div></div>;
  }
}

export default If

