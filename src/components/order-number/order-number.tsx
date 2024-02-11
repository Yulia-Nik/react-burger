import styles from './order-number.module.css';

interface IOrderNumberProps {
	status?: string;
	number: number;
}

const OrderNumber = ({ status, number }: IOrderNumberProps): JSX.Element => {
	return (
		<p className={`text text_type_digits-default${status && status === 'done' ? ` ${styles.done}` : ''}`}>{number}</p>
	);
}

export default OrderNumber;
