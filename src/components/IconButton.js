import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import PropTypes from 'prop-types';

/**
 * Component that adds the functionality of a button into a child icon.
 * @param {Object} props 
 * @todo it is a bit buggy maybe update this component or delete it.
 */
const IconButton = ({className, onClick, children}) => {
  return (
    <span className={css(styles.container, className)} onClick={onClick}>
      {children}
    </span>
  );
};

const styles = StyleSheet.create({
  container: {
    cursor: 'pointer',
  },
});

IconButton.propTypes = {
  className: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default IconButton;
