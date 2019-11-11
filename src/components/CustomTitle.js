import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import PropTypes from 'prop-types';

/**
 * Component that is used as a label before input, counters, etc. Highly reuseable.
 * @param {Object} props 
 */
const CustomTitle = ({children, className}) => {
  const styles = StyleSheet.create({
    label: {
      display: 'inline-block',
      fontSize: 20,
      color: '#ec2127',
      marginRight: 7,
      textAlign: 'center',
    }
  });
  
  return (
    <div className={css(styles.label, className)}>{children}</div>
  );
};

CustomTitle.propTypes = {
  className: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
};

export default CustomTitle;
