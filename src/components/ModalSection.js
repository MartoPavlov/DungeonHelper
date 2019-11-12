import React, {useState} from 'react';
import {css , StyleSheet} from 'aphrodite';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CustomButton from './CustomButton';
import CustomHeading from './CustomHeading';
import If from './If';
import PropTypes from 'prop-types';

/**
 * Component that renders a button which when clicked showes a modal. Highly
 * reuseable.
 * @param {Object} props
 */
const ModalSection = ({title, label, children, width='20%', className}) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className={css(styles.container, className)}>
      <If condition={!!title}>
        <CustomHeading>{title}</CustomHeading>
      </If>
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
            <CustomButton
              className={styles.closeButton}
              onClick={() => setOpen(false)}
              fontSize={14}
            >
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
    textAlign: 'center',
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
  },
  closeButton: {
    display: 'inline-block'
  }
});

ModalSection.propTypes = {
  className: PropTypes.object,
  title: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default ModalSection
