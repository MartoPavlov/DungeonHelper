import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import CustomTitle from './CustomTitle';
import CustomButton from './CustomButton';
import If from './If';

const SpellCaster = ({className, label, onClick, fontSize = 20, contition=true}) => {
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
  const level = label.split(" ")[1];

  return (
    <div className={css(styles.spellCaster, className)}>
      <CustomTitle className={styles.label}>{label}</CustomTitle>
      <CustomButton
        className={styles.button}
        fontSize={fontSize-9}
        onClick={() => onClick(level)}
        disabled={!contition}
      >
        Use
      </CustomButton>
    </div>
  );
};

export default SpellCaster;
