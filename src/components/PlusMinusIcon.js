import React from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import If from './If';

const PlusMinusIcon = ({minus, onClick}) => {
  const renderPlus = () => {
    return <AddCircleOutlineIcon color="error" fontSize="inherit" onClick={onClick}/>
  }

  return (
    <If condition={minus} els={renderPlus()}>
      <RemoveCircleOutlineIcon color="error" fontSize="inherit" onClick={onClick} />
    </If>
  );
};


export default PlusMinusIcon;
