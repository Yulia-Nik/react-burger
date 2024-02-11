import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
import { IIngredientType, TIngredientsGroupNames } from '../../utils/types';
import { getIngredientCount } from '../../utils/data-utils';
import { SET_CURRENT_INGREDIENT } from '../../services/current-ingredient/actions';
import { useDispatch, useSelector } from '../../services/store';

import styles from './ingredient-card.module.css';

interface IIngredientCardProps {
	ingredient: IIngredientType
}

interface IDragObject {
	id: string;
	type: TIngredientsGroupNames;
}

const IngredientCard = ({ingredient}: IIngredientCardProps): JSX.Element => {
	const dispatch = useDispatch();
	const burgerIngredients = useSelector(store => store.burgerIngredients.burgerIngredients);

	const [, dragRef] = useDrag<IDragObject, unknown, unknown>({
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

	const location = useLocation();

	return (
		<Link
			to={`/ingredients/${ingredient._id}`}
			state={{ backgroundLocation: location }}
			className={styles.ingredientCard}
			onClick={handleOpenModal}
			ref={dragRef}
			draggable
		>
			<img alt={ingredient.name} src={ingredient.image} />
			<Price price={ingredient.price} />
			<div className={styles.name}>{ingredient.name}</div>
			{!!count && (
				<Counter count={count} />
			)}
		</Link>
	);
};

export default IngredientCard;
