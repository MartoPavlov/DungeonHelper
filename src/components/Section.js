import React from 'react';
import CustomHeading from './CustomHeading';
import { css } from 'aphrodite';
import PropTypes from 'prop-types';

/**
 * Component that renders a title and a list of items below it
 * @param {Object} props
 */
const Section = ({className, title, fields, builderItem}) => {
  const items = fields.map((item) => {
    return (
      <div key={item}>
        {builderItem(item)}
      </div>
    );
  });
  
  return (
    <div className={css(className)}>
      <CustomHeading>{title}</CustomHeading>
      {items}
    </div>
  );
};

Section.propTypes = {
  className: PropTypes.object,
  title: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  builderItem: PropTypes.func.isRequired,
};

export default Section;
