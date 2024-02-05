import { useEffect } from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Loader from '../../components/loader/loader';
import { getIngredientById } from '../../utils/data-utils';
import { getIngredients } from '../../services/ingredients/actions';
import { useDispatch, useSelector } from '../../services/store';

import styles from './ingredients.module.css';

const Ingredients = (): JSX.Element => {
	const dispatch = useDispatch();
	const id = window.location.pathname.split('/')[2] || '';
	const { ingredients, isLoading } = useSelector(store => store.ingredients);
	const currentIngredient = ingredients ? getIngredientById(ingredients, id) : null;

	//@ts-ignore
	useEffect(() => dispatch(getIngredients()), []);

	return (
		<>
			{isLoading && (
				<Loader />
			)}
			{!isLoading && currentIngredient && (<section className={`mt-20`}>
				<h1 className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</h1>
				<IngredientDetails ingredient={currentIngredient} />
			</section>)}
			{!isLoading && !currentIngredient && (
				<h1>Ингредиент не найден</h1>
			)}
		</>
	);
};

export default Ingredients;
