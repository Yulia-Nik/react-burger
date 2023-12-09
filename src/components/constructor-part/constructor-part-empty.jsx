import PropTypes from 'prop-types';

import styles from './constructor-part.module.css';

const ConstructorPartEmpty = props => {
	const { outline } = props;

	return (
		<div className={styles.wrap}>
			<div className={`constructor-element ${styles.emptyContainer}`} style={{outline}}>{props.children}</div>
		</div>
	);
};

ConstructorPartEmpty.propTypes = {
	children: PropTypes.node,
	border: PropTypes.string,
};

export default ConstructorPartEmpty;
