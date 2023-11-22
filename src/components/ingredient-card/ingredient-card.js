import PropTypes from 'prop-types';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../components/price/price';

import styles from './ingredient-card.module.css';

const IngredientCard = props => {
	return (
		<div className={styles.ingredientCard}>
			<img alt={props.alt} src={props.image} />
			<Price price={props.price} />
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
	price: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	name: PropTypes.string,
	count: PropTypes.number,
};

export default IngredientCard;
