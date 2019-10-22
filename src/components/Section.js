import React from 'react';
import StatCounter from './StatCounter';

const Section = ({title, dictionary}) => {
  const items = dictionary.map((item) => {
    return <StatCounter key={item} label={item} />
  });
  
  return (
    <div>
      <label className="title">{title}</label>
      {items}
    </div>
  );
};

export default Section;
