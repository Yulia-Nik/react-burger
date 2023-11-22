import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.css';

const Price = props =>{
	return (
		<div className={styles.cost}>
			{props.price}
			<CurrencyIcon type="primary" className="ml-2" />
		</div>
	);
};

Price.propTypes = {
	cost: PropTypes.number
};

export default Price;
