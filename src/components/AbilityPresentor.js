import React from 'react';

const AbilityPresentor = ({ability}) => {
  const {name, uses, cooldown} = ability[0];
  return (
    <div>
      <div className="title">{name}</div>
      <div className="label">Uses: {uses}</div>
      <div className="label">Regained after {cooldown}</div>
      <div style={{paddingBottom: 20}}></div>
    </div>
  );
};

export default AbilityPresentor;
