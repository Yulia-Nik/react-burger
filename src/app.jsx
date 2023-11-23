import React from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import './app.css';

import { ingredientsData } from './utils/data'; // Временный импорт

const ingredients = ingredientsData.reduce((acc, elem) => {
	const newType = Object.keys(acc).indexOf(elem.type) === -1;

	if (newType) {
		return {
			...acc,
			[elem.type]: [
				elem
			]
		};
	} else {
		return {
			...acc,
			[elem.type]: [
				...acc[elem.type],
				elem,
			]
		};
	}
}, {});
console.log(ingredients);

function App() {
	return (
		<div className="app">
			<AppHeader />
			<main className="pt-10 pb-10 pl-6 pr-6">
				<h1 className="pl-5 pr-5 mb-5">
					Соберите бургер
				</h1>
				<div className="main-content">
					<BurgerIngredients ingredients={ingredients} />
					<BurgerConstructor />
				</div>
			</main>
		</div>
	);
}

export default App;
