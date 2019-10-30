import React from 'react';
import { css, StyleSheet } from 'aphrodite';

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

export default Image;
