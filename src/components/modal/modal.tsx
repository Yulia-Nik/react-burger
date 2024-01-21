import { createPortal } from 'react-dom';
import ModalBody, { IModalBodyProps } from './part/modal-body/modal-body';
import ModalOverlay from './part/modal-overlay/modal-overlay';

import styles from './modal.module.css';
import { useEffect } from 'react';

const Modal = ({title, children, onClose}: IModalBodyProps): JSX.Element => {
	const modalRoot = document.getElementById('modal-root')!;

	useEffect(() => {
		const closeByEscape = (event: KeyboardEvent): void => {
			if (event.key === 'Escape') {
				onClose();
			}
		};
		document.addEventListener('keydown', closeByEscape);

		return () => {
			document.removeEventListener('keydown', closeByEscape);
		};
	}, [onClose]);

	return createPortal(
		<div className={styles.wrap}>
			<ModalOverlay onClose={onClose} />
			<ModalBody title={title} onClose={onClose}>
				{children}
			</ModalBody>
		</div>
		, modalRoot
	);
};

export default Modal;
