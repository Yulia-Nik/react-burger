import React from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import './app.css';

function App() {
	return (
		<div className="app">
			<AppHeader />
			<main className="pt-10 pb-10 pl-6 pr-6">
				<h1 className="pl-5 pr-5 mb-5">
					Соберите бургер
				</h1>
				<div className="main-content">
					<BurgerIngredients />
					<BurgerConstructor />
				</div>
			</main>
		</div>
	);
}

export default App;
