import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FillingIngredientItem from '../filling-ingredient-item/filling-ingredient-item';
import { UPDATE_FILLING_INGREDIENTS } from '../../services/burger-ingredients/actions';
import { IBurgerIngredientType } from '../../utils/types';

import styles from './filling-ingredients.module.css';

const FillingIngredients = (): JSX.Element => {
	const dispatch = useDispatch();
	// @ts-ignore
	const burgerIngredients = useSelector(store => store.burgerIngredients.burgerIngredients);

	const moveCard = useCallback((dragIndex: number, hoverIndex: number): void => {
		const updateFilling = [...burgerIngredients.filling];
		updateFilling.splice(hoverIndex, 0, updateFilling.splice(dragIndex, 1)[0]);

		dispatch({
			type: UPDATE_FILLING_INGREDIENTS,
			payload: {
				dragIndex,
				hoverIndex
			},
		});
	}, []);

	const renderCard = useCallback((ingredient: IBurgerIngredientType, index: number): JSX.Element => {
		return (
			<FillingIngredientItem
				key={ingredient.ingredientId}
				index={index}
				id={ingredient.ingredientId}
				ingredient={ingredient}
				extraClass={index < burgerIngredients.filling.length - 1 ? 'mb-4' : ''}
				moveCard={moveCard}
			/>
		)
	}, [burgerIngredients.filling])

	return (
		<ul className={styles.scrollList}>
			{burgerIngredients.filling.map((ingredient: IBurgerIngredientType, index: number): JSX.Element => renderCard(ingredient, index))}
		</ul>
	);
};

export default FillingIngredients;
