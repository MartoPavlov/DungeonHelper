import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import CustomTitle from './CustomTitle';
import CustomHeading from './CustomHeading'

const AbilityPresentor = ({className, ability}) => {
  const {name, uses, cooldown} = ability[0];

  return (
    <div className={css(styles.container, className)}>
      <CustomHeading>{name}</CustomHeading>
      <CustomTitle>Uses: {uses}</CustomTitle>
      <CustomTitle>Regained after {cooldown}</CustomTitle>
      <div style={{paddingBottom: 20}}></div>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  }
});

export default AbilityPresentor;
