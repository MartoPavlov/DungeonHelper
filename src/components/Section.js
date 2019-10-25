import React from 'react';

const Section = ({title, fields, builderItem}) => {
  const items = fields.map((item) => {
    return (
      <div key={item}>
        {builderItem(item)}
      </div>
    );
  });
  
  return (
    <div>
      <div className="title">{title}</div>
      {items}
    </div>
  );
};

export default Section;
