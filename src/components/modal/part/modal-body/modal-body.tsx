import { PropsWithChildren, ReactNode } from 'react';

import styles from './modal-body.module.css';

export interface IModalBodyProps extends PropsWithChildren {
	title?: string | ReactNode;
	onClose: () => void;
}

const ModalBody = ({title, children, onClose}: IModalBodyProps): JSX.Element => {
	return (
		<div className={styles.body}>
			<div className={styles.header}>
				{title && (
					<h3 className={styles.title}>{title}</h3>
				)}
				<button className={styles.close} onClick={onClose} data-name="close-modal"></button>
			</div>
			<div className={styles.content}>
				{children}
			</div>
		</div>
	);
};

export default ModalBody;
