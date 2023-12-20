import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Loader from '../../components/loader/loader';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { getIngredients } from '../../services/ingredients/actions';

import styles from './home.module.css';

const Home = () => {
	const dispatch = useDispatch();
	const { ingredients, isLoading, error } = useSelector(store => store.ingredients);

	useEffect(() => dispatch(getIngredients()), []);

	return (
		<>
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
		</>
	);
};

export default Home;
