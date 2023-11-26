import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

const ModalOverlay = ({onClose}) => {
	return (
		<div className={styles.overlay} onClick={onClose}></div>
	);
};

ModalOverlay.propTypes = {
	onClose: PropTypes.any,
};

export default ModalOverlay;
