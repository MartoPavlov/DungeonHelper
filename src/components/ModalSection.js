import React, {useState} from 'react';
import {css , StyleSheet} from 'aphrodite';
import Modal from '@material-ui/core/Modal';
import Button from './CustomButton';

const ModalSection = ({title, label, children}) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <div className="title">{title}</div>
      <Modal
        open={open}
        className={css(styles.modal)}
        onClose={() => {setOpen(false)}}
      >
        <div className={css(styles.modalContent)}>{children}</div>
      </Modal>
      <Button onClick={() => {setOpen(true)}}>{label}</Button>
    </div>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    position: 'absolute',
    width: '70%',
    left: '15%',
    height: '70%',
    top: '10%',
    backgroundColor: '#fff',
    outline: 'none',
    padding: 5,
    borderRadius: 10,
  }
});

export default ModalSection
