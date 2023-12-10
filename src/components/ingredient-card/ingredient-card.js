import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../components/price/price';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientType } from '../../utils/types';
import { getIngredientCount } from '../../utils/data-utils';
import { SET_CURRENT_INGREDIENT, DELETE_CURRENT_INGREDIENT } from '../../services/current-ingredient/actions';

import styles from './ingredient-card.module.css';

const IngredientCard = ({ingredient}) => {
	const dispatch = useDispatch();
	const { burgerIngredients, currentIngredient } = useSelector(store => ({
		burgerIngredients: store.burgerIngredients.burgerIngredients,
		currentIngredient: store.currentIngredient.currentIngredient,
	}));

	const [, dragRef] = useDrag({
		type: ingredient.type === 'bun' ? 'bun' : 'filling',
		item: {
			id: ingredient._id,
			type: ingredient.type,
		},
	});

	const count = getIngredientCount(ingredient.type, ingredient._id, burgerIngredients);

	const handleOpenModal = () => {
		dispatch({
			type: SET_CURRENT_INGREDIENT,
			payload: ingredient,
		})
	};

	const handleCloseModal = () => {
		dispatch({
			type: DELETE_CURRENT_INGREDIENT
		});
	};

	return (
		<>
			<div className={styles.ingredientCard} onClick={handleOpenModal} ref={dragRef} draggable>
				<img alt={ingredient.alt} src={ingredient.image} />
				<Price price={ingredient.price} />
				<div className={styles.name}>{ingredient.name}</div>
				{count && (
					<Counter count={count} />
				)}
			</div>
			{currentIngredient && (
				<Modal title="Детали ингредиента" onClose={handleCloseModal}>
					<IngredientDetails ingredient={currentIngredient} />
				</Modal>
			)}
		</>
	);
};

IngredientCard.propTypes = {
	ingredient: ingredientType,
};

export default IngredientCard;
