import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'aphrodite';
import CustomList from './CustomList';
import SpellCaster from './SpellCaster';
import CustomHeading from './CustomHeading';
import PropTypes from 'prop-types';

/**
 * Component that give a representation of the inventory and also has the 
 * mechanism to change it.
 * @param {Object} props
 */
const InventoryManager = ({className, onClick}) => {
  const inventory = useSelector((state) => state.inventory.inventory);
  const [bounds,  setBounds] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const resize = (event) => {
    const resized = {
      width: event.target.innerWidth,
      height: event.target.innerHeight,
    };
    setBounds(resized);
  }

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  });
  return (
    <div>
      <CustomHeading className={styles.itemManagerTitle}>
        Inventory
      </CustomHeading>
      <CustomList
        data={inventory}
        width={bounds.width*7/10}
        height={bounds.height*5/9}
        renderItem={(item) => {
          const name = item.name;
          const count = item.count;
          const label = name + ' (' + count + ')';

          return( 
            <SpellCaster
              className={className}
              label={label}
              onClick={onClick}
              passedArgument={name}
              contition={count > 0}
            />
          );
        }}
      />
    </div>
  );
};

const styles = StyleSheet.create({
  itemManagerTitle: {
    marginBottom: 30,
  }
});

InventoryManager.propTypes = {
  className: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

export default InventoryManager;
