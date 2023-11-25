import { createPortal } from 'react-dom';

import ModalBody from './part/modal-body/modal-body';
import ModalOverlay from './part/modal-overlay/modal-overlay';

import styles from './modal.module.css';

const Modal = ({title, children, onClose}) => {
	const modalRoot = document.getElementById('modal-root');

	return createPortal(
		<div className={styles.wrap}>
			<ModalOverlay onClick={onClose} />
			<ModalBody title={title} onClose={onClose}>
				{children}
			</ModalBody>
		</div>
		, modalRoot
	);
};

export default Modal;
