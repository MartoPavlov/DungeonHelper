import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import PropTypes from 'prop-types';

/**
 * Component that renders a customizable heading. Highly reuseable.
 * @param {Object} props 
 */
const CustomHeading = ({children, className}) => {
  return (
    <div className={css(styles.title, className)}>{children}</div>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginBottom: '2%',
    marginTop: '4%',
    color: '#ec2127',
    textAlign: 'center',
  }
});

CustomHeading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
  title: PropTypes.string,
};

export default CustomHeading;
