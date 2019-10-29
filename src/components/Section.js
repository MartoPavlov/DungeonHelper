import React from 'react';
import CustomHeading from './CustomHeading';

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
      <CustomHeading>{title}</CustomHeading>
      {items}
    </div>
  );
};

export default Section;
