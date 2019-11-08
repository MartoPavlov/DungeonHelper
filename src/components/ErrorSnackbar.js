import React from 'react';
import CustomSnackbar from './CustomSnackbar';

const ErrorSnackbar = ({className, message, onClose}) => {
  return (
    <CustomSnackbar
      className={className}
      condition={message!==''}
      message={message}
      onClose={onClose}
      type='error'
    />
  );
};

export default ErrorSnackbar;
