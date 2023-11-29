import PropTypes from 'prop-types';

import styles from './modal-body.module.css';

const ModalBody = ({title, children, onClose}) => {
	return (
		<div className={styles.body}>
			<div className={styles.header}>
				{title && (
					<h3 className={styles.title}>{title}</h3>
				)}
				<button className={styles.close} onClick={onClose}></button>
			</div>
			<div className={styles.content}>
				{children}
			</div>
		</div>
	);
};

ModalBody.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
	onClose: PropTypes.func,
}

export default ModalBody;
