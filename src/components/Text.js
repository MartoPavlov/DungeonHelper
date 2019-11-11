import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import PropTypes from 'prop-types';

/**
 * Component that renders a text with the custom color and font size
 * @param {Object} props
 * @todo consider removing this component. CustomTitle can do the same.
 * @see CustomTitle
 */
const Text = ({children, className}) => {
  return (
    <div className={css(styles.text, className)}>{children}</div>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ec2127',
  }
});

Text.propTypes = {
  className: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

export default Text;
