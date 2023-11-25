import React, { useEffect, useState } from 'react';
import Loader from './components/loader/loader';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

import { formatIngredientsData } from './utils/utils';

import './app.css';

const INGREDIENTS_REQUEST_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [ingredientsData, setIngredientsData] = useState([]);

	useEffect(() => {
		fetch(INGREDIENTS_REQUEST_URL)
			.then(res => res.json())
			.then(res => {
				if (res.success) {
					setIsLoading(false);
					setIngredientsData(res.data);
				} else {
					setIsLoading(false);
					console.log(`Произошла ошибка`);
				}
			})
			.catch(err => {
				setIsLoading(false);
				console.log(`Произошла ошибка: ${err}`);
			});
	}, []);

	return (
		<div className="app">
			<AppHeader />
			{isLoading && (
				<Loader />
			)}
			{!isLoading && ingredientsData.length > 0 && (
				<main className="pt-10 pb-10 pl-6 pr-6">
					<h1 className="pl-5 pr-5 mb-5">
						Соберите бургер
					</h1>
					<div className="main-content">
						<BurgerIngredients ingredients={formatIngredientsData(ingredientsData)} />
						<BurgerConstructor />
					</div>
				</main>
			)}
		</div>
	);
}

export default App;
