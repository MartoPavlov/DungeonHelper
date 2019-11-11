import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import PropTypes from 'prop-types';

/**
 * Component that renders a label with the custom background. Highly reuseable
 * @param {Object} props 
 */
const CustomLabel = ({className, children}) => {
  const styles = StyleSheet.create({
    label: {
      display: 'inline-block',
      width: '20%',
      fontSize: 16,
      backgroundColor: '#ec2127',
      color: '#fff',
      borderRadius: 16,
      textAlign: 'center',
    }
  });
    
  return (
    <div className={css(styles.label, className)}>{children}</div>
  );
};

CustomLabel.propTypes = {
  className: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
};

export default CustomLabel;
