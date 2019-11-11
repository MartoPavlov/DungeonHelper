import React from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import If from './If';
import PropTypes from 'prop-types';

/**
 * Component that renders a minus/plus icon and when click it changes to the
 * opposite.
 * @param {Object} props
 * @todo maybe we can add a className prop as well to increace reuseability
 */
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

PlusMinusIcon.propTypes = {
  minus: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PlusMinusIcon;
