import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../components/price/price';
import { ingredientType } from '../../utils/types';
import { getIngredientCount } from '../../utils/utils';

import styles from './ingredient-card.module.css';

const IngredientCard = ({ingredient, onSelect}) => {
	const burgerIngredients = useSelector(store => store.burgerIngredients.burgerIngredients);

	const [, dragRef] = useDrag({
		type: ingredient.type === 'bun' ? 'bun' : 'filling',
		item: {
			id: ingredient._id,
			type: ingredient.type,
		},
	});

	const count = getIngredientCount(ingredient.type, ingredient._id, burgerIngredients);

	const handleClick = () => onSelect(ingredient);

	return (
		<div className={styles.ingredientCard} onClick={handleClick} ref={dragRef} draggable>
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
	ingredient: ingredientType,
	onSelect: PropTypes.func,
};

export default IngredientCard;
