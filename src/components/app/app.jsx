import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/loader';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../services/ingredients/actions';

import styles from './app.module.css';

function App() {
	const dispatch = useDispatch();
	const { ingredients, isLoading, error } = useSelector(store => store.ingredients);

	useEffect(() => dispatch(getIngredients()), []);

	return (
		<div className={styles.app}>
			<AppHeader extraClass={styles.content} />
			{isLoading && (
				<Loader />
			)}
			{!isLoading && ingredients && (
				<main className={`pt-10 pb-10 pl-6 pr-6 ${styles.content} ${styles.mainContent}`}>
					<h1 className="pl-5 pr-5 mb-5">
						Соберите бургер
					</h1>
					<div className={styles.row}>
						<BurgerIngredients extraClass={styles.column} ingredients={ingredients} />
						<BurgerConstructor extraClass={styles.column} />
					</div>
				</main>
			)}
		</div>
	);
}

export default App;
