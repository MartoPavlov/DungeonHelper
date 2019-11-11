import React from 'react';
import {css , StyleSheet} from 'aphrodite';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

/**
 * Component that is colored differently Button from the material
 * library.
 * @param {Object} props 
 * @todo Reuseability can be improved. Maybe add all the functionality
 * of the material Button
 */
const CustomButton = ({onClick, children, fontSize = 18, width = '15%', className,
   disabled = false}) => {
  const styles = StyleSheet.create({
    container: {
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#ec2127',
      color: '#fff',
      fontSize: fontSize,
      height: fontSize * 2,
      width: width,
      padding: 0,
      textTransform: 'none',
    },
    disabled: {
      backgroundColor: '#ec2127',
      color: '#fff',
      fontSize: fontSize,
      height: fontSize * 2,
      width: width,
      padding: 0,
      textTransform: 'none',
      opacity: 0.5,
    }
  });
  const buttonStyle = disabled ? styles.disabled : styles.button;
  
  return (
    <div className={css(styles.container, className)}>
      <Button
        className={css(buttonStyle)}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
    </div>
  );
};

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  className: PropTypes.object,
  disabled: PropTypes.bool,
};

export default CustomButton;
