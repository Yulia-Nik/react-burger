import { useEffect } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Loader from '../loader/loader';
import AppHeader from '../app-header/app-header';
import { store } from '../../services/store';
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
			<Provider store={store}>
				<AppHeader extraClass={styles.content} />
				{isLoading && (
					<Loader />
				)}
				{!isLoading && ingredients && (
					<main className={`pt-10 pb-10 pl-6 pr-6 ${styles.content} ${styles.mainContent}`}>
						<h1 className="pl-5 pr-5 mb-5">
							Соберите бургер
						</h1>
						<DndProvider backend={HTML5Backend}>
							<div className={styles.row}>
								<BurgerIngredients extraClass={styles.column} />
								<BurgerConstructor extraClass={styles.column} />
							</div>
						</DndProvider>
					</main>
				)}
			</Provider>
		</div>
	);
}

export default App;
