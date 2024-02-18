import iconDone from '../../images/icon-done.png';
import LuminousText from '../luminous-text/luminous-text';

import styles from './order-details.module.css';

interface IOrderDetailsProps {
	orderNumber: number | string;
}

const OrderDetails = ({ orderNumber }: IOrderDetailsProps): JSX.Element => {
	return (
		<div className={styles.container}>
			<LuminousText text={orderNumber} type="large" extraClass="pl-10 pr-10 mb-8" name="order-number" />
			<div className={styles.title}>идентификатор заказа</div>
			<img src={iconDone} alt="Заказ принят" className={styles.icon} />
			<div className="mb-2">Ваш заказ начали готовить</div>
			<div className={styles.subtext}>Дождитесь готовности на орбитальной станции</div>
		</div>
	);
};

export default OrderDetails;
