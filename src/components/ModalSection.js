import React, {useState} from 'react';
import {css , StyleSheet} from 'aphrodite';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CustomButton from './CustomButton';
import CustomHeading from './CustomHeading';

const ModalSection = ({title, label, children, width='20%', className}) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className={css(styles.container, className)}>
      <CustomHeading>{title}</CustomHeading>
      <Modal
        open={open}
        className={css(styles.modal)}
        onClose={() => {setOpen(false)}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={css(styles.modalContent)}>
            {children}
            <CustomButton onClick={() => setOpen(false)} fontSize={14}>
              CLOSE
            </CustomButton>
          </div>
        </Fade>
      </Modal>
      <CustomButton onClick={() => setOpen(true)} fontSize={18} width={width}>
        {label}
      </CustomButton>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
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
