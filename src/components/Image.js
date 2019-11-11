import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';

/**
 * Custom component that renders an image. Good reuseability.
 * @param {Object} props
 */
const Image = ({src, className}) => {
  return (
    <div className={css(styles.container)}>
      <img className={css(className)} src={src} alt="" />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
});

Image.propTypes = {
  className: PropTypes.object,
  src: PropTypes.string.isRequired,
};

export default Image;
