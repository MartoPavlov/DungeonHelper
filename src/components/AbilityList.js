import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Modal from '@material-ui/core/Modal';
import {css, StyleSheet} from 'aphrodite';
import CustomButton from './CustomButton';
import AbilityPresentor from './AbilityPresentor';
import CustomList from './CustomList';

const AbilityList = () => {
  const abilities = useSelector((state) => state.abilities.abilities);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [screen, setScreen] =
     useState({width: window.innerWidth, height: window.innerHeight});
  const handleResize = (event) => {
    const target = event.target;
    setScreen({width: target.innerWidth, height: target.innerHeight})
  }
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [screen.width, screen.height]);

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className={css(styles.modalContent)}>
          <AbilityPresentor
            ability={abilities.filter((ability) => ability.name === name)}
          />
        </div>
      </Modal>
      <CustomList
        height={screen.height * 4/9}
        width={screen.width * 7/10}
        data={abilities}
        renderItem={(ability) => {
          return (
            <CustomButton fontSize={18} width={'50%'} onClick={() => {
              setOpen(true);
              setName(ability.name);
            }}>
              {ability.name}
            </CustomButton>
          );
        }}
      />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  modalContent: {
    position: 'absolute',
    width: '50%',
    left: '25%',
    top: '20%',
    backgroundColor: '#fff',
    outline: 'none',
    padding: 5,
    borderRadius: 10,
  }
});

export default AbilityList;
