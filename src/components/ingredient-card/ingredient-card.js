import PropTypes from 'prop-types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../components/price/price';
import { ingredientType } from '../../utils/types';

import styles from './ingredient-card.module.css';

const IngredientCard = ({ingredient, count, onSelect}) => {
	const handleClick = () => onSelect(ingredient);

	return (
		<div className={styles.ingredientCard} onClick={handleClick}>
			<img alt={ingredient.alt} src={ingredient.image} />
			<Price price={ingredient.price} />
			<div className={styles.name}>{ingredient.name}</div>
			{count && (
				<Counter count={count} />
			)}
		</div>
	);
};

IngredientCard.propTypes = {
	ingredient: PropTypes.shape({...ingredientType}),
	count: PropTypes.number,
	onSelect: PropTypes.func,
};

export default IngredientCard;
