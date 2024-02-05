import { getStatusOrderName } from '../../utils/data-utils';

import styles from './order-status.module.css';

interface IOrderStatusProps {
	status: string;
}

const OrderStatus = ({ status }: IOrderStatusProps): JSX.Element => {
	return (
		<div className={`text text_type_main-default mt-2${status === 'done' ? ` ${styles.done}` : ''}`}>
			{getStatusOrderName(status)}
		</div>
	);
};

export default OrderStatus;
