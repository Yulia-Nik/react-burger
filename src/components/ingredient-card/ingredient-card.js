import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';

const IngredientCard = props => {
	return (
		<div className={styles.ingredientCard}>
			<img alt={props.alt} src={props.src} />
			<div className={styles.cost}>
				{props.cost}
				<CurrencyIcon type="primary" className="ml-2" />
			</div>
			<div className={styles.name}>{props.name}</div>
			{props.count && (
				<Counter count={props.count} />
			)}
		</div>
	);
};

IngredientCard.propTypes = {
	alt: PropTypes.string,
	src: PropTypes.any, // изменить
	cost: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	name: PropTypes.string,
	count: PropTypes.number,
};

export default IngredientCard;
