import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarMessage from './SnackbarMessage';

const CustomSnackbar = ({className, condition, message, onClose, type}) => {

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={condition}
      onClose={onClose}
    >
      <SnackbarMessage
        className={className}
        type={type}
        message={message}
        onClose={onClose}
      />
    </Snackbar>
  );
};

export default CustomSnackbar;
