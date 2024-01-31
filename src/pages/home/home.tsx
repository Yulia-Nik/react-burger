import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Loader from '../../components/loader/loader';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { getIngredients } from '../../services/ingredients/actions';
import { useDispatch, useSelector } from '../../services/store';

import styles from './home.module.css';

const Home = (): JSX.Element => {
	const dispatch = useDispatch();
	const { ingredients, isLoading } = useSelector(store => store.ingredients);

	useEffect(() => dispatch(getIngredients()), []);

	return (
		<>
			{isLoading && (
				<Loader />
			)}
			{!isLoading && ingredients && (
				<section>
					<h1 className="pl-5 pr-5 mb-5">
						Соберите бургер
					</h1>
					<DndProvider backend={HTML5Backend}>
						<div className={styles.row}>
							<BurgerIngredients extraClass={styles.column} />
							<BurgerConstructor extraClass={styles.column} />
						</div>
					</DndProvider>
				</section>
			)}
		</>
	);
};

export default Home;
