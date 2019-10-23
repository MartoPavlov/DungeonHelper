import React from 'react';
import {useSelector} from 'react-redux';
import {css, StyleSheet} from 'aphrodite';
import List from '@material-ui/core/List';
import CustomButton from './CustomButton';

const AbilityList = () => {
  const abilities = useSelector((state) => state.abilities.abilities);
  
  return (
    <List className={css(styles.container)}>
      {abilities.map((ability) => {
        return (
          <div>
            <CustomButton fontSize={18}>{ability.name}</CustomButton>
          </div>
        );
      })}
    </List>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
});

export default AbilityList;
