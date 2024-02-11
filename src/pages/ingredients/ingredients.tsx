import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Loader from '../../components/loader/loader';
import { getIngredientById } from '../../utils/data-utils';
import { IIngredientType } from '../../utils/types';
import { useSelector } from '../../services/store';

import styles from './ingredients.module.css';

const Ingredients = (): JSX.Element => {
	const { id } = useParams();
	const { ingredients, isLoading } = useSelector(store => store.ingredients);
	const [ingredientId, setIngredientId] = useState<string>('');
	const [currentIngredient, setCurrentIngredient] = useState<IIngredientType | null>(null);

	useEffect(() => {
		if (id) {
			setIngredientId(id.replace(':', ''));
		}
	}, []);

	useEffect(() => {
		if (ingredients && ingredientId) {
			setCurrentIngredient(getIngredientById(ingredients, ingredientId));
		}
	}, [ingredients, ingredientId]);

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
