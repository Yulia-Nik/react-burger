import PropTypes from 'prop-types';
import iconDone from '../../images/icon-done.png';

import styles from './order-details.module.css';

const OrderDetails = ({ orderNumber }) => {
	return (
		<div className={styles.container}>
			<div className={styles.number}>{orderNumber}</div>
			<div className={styles.title}>идентификатор заказа</div>
			<img src={iconDone} alt="Заказ принят" className={styles.icon} />
			<div className="mb-2">Ваш заказ начали готовить</div>
			<div className={styles.subtext}>Дождитесь готовности на орбитальной станции</div>
		</div>
	);
};

OrderDetails.propTypes = {
	orderNumber: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	])
};

export default OrderDetails;
