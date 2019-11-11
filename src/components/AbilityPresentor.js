import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import CustomTitle from './CustomTitle';
import CustomHeading from './CustomHeading'
import PropTypes from 'prop-types';

/**
 * Component fit to present the data about an ability
 * @param {object} props
 */
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

AbilityPresentor.propTypes = {
  className: PropTypes.object,
  ability: PropTypes.array.isRequired,
};

export default AbilityPresentor;
