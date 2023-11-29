import { useEffect, useState } from 'react';
import Loader from '../loader/loader';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { formatIngredientsData } from '../../utils/utils';

import styles from './app.module.css';

const INGREDIENTS_REQUEST_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [ingredientsData, setIngredientsData] = useState([]);

	useEffect(() => {
		fetch(INGREDIENTS_REQUEST_URL)
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка ${res.status}`);
			})
			.then(res => {
				if (res.success) {
					setIngredientsData(res.data);
				} else {
					throw new Error('Ошибка при получении данных');
				}
			})
			.catch(err => console.error(`Произошла ошибка: ${err}`))
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader extraClass={styles.content} />
			{isLoading && (
				<Loader />
			)}
			{!isLoading && ingredientsData.length > 0 && (
				<main className={`pt-10 pb-10 pl-6 pr-6 ${styles.content} ${styles.mainContent}`}>
					<h1 className="pl-5 pr-5 mb-5">
						Соберите бургер
					</h1>
					<div className={styles.row}>
						<BurgerIngredients extraClass={styles.column} ingredients={formatIngredientsData(ingredientsData)} />
						<BurgerConstructor extraClass={styles.column} />
					</div>
				</main>
			)}
		</div>
	);
}

export default App;
