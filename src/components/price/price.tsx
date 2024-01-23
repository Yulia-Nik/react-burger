import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.css';

interface IPriceProps {
	price: number;
	type?: 'big' | '';
}

const Price = (props: IPriceProps): JSX.Element =>{
	return (
		<div className={`${styles.cost}${props.type === 'big' ? ` ${styles.costBig}` : ''}`}>
			{props.price}
			<CurrencyIcon type="primary" />
		</div>
	);
};

export default Price;
