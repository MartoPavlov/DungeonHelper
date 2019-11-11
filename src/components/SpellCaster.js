import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import CustomTitle from './CustomTitle';
import CustomButton from './CustomButton';
import PropTypes from 'prop-types';

/**
 * Component which is designed to use spell slots, inventory item quantity, etc.
 * Good reuseabiliy.
 * @param {Object} props
 */
const SpellCaster = ({className, label, onClick, fontSize = 20, contition=true,
    passedArgument}) => {
  const styles = StyleSheet.create({
    spellCaster: {
      marginBottom: 7,
    },
    label: {
      fontSize: fontSize
    },
    button: {
      display: 'inline-block',
    }
  });

  return (
    <div className={css(styles.spellCaster, className)}>
      <CustomTitle className={styles.label}>{label}</CustomTitle>
      <CustomButton
        className={styles.button}
        fontSize={fontSize-9}
        onClick={() => onClick(passedArgument)}
        disabled={!contition}
      >
        Use
      </CustomButton>
    </div>
  );
};

SpellCaster.propTypes = {
  className: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  fontSize: PropTypes.number,
  contition: PropTypes.bool,
  passedArgument: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default SpellCaster;
