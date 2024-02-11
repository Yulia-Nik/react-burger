import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { store } from '../../services/store';
import {
	Home,
	NonExistentPage,
	Login,
	Register,
	ForgotPassword,
	ResetPassword,
	Profile,
	Ingredients,
	Orders,
	Feed,
	Order,
} from '../../pages';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderInfo from '../order-info/order-info';
import { DELETE_CURRENT_INGREDIENT } from '../../services/current-ingredient/actions';
import { DELETE_CURRENT_ORDER } from '../../services/current-order/actions';
import { checkUserAuth } from '../../services/auth/actions';
import { getIngredients } from '../../services/ingredients/actions';
import { useSelector, useDispatch } from '../../services/store';
import { OnlyAuth, OnlyUnAuth } from '../protected-route-element/protected-route-element';

import styles from './app.module.css';

function App(): JSX.Element {
	const dispatch = useDispatch();
	const location = useLocation();
	const { state } = location;
	const currentIngredient = useSelector(store => store.currentIngredient.currentIngredient);
	const currentOrder = useSelector(store => store.currentOrder.currentOrder);
	const navigate = useNavigate();

	const handleCloseModalIngredient = (): void => {
		dispatch({
			type: DELETE_CURRENT_INGREDIENT
		});

		navigate('/', {replace: true});
	};

	const handleCloseModalOrder = (url: string): void => {
		dispatch({
			type: DELETE_CURRENT_ORDER
		});

		navigate(url, {replace: true});
	};

	useEffect(() => {
		dispatch(checkUserAuth());

		dispatch(getIngredients());
	}, []);

	return (
		<div className={styles.app}>
			<Provider store={store}>
				<AppHeader extraClass={styles.content} />

				<main className={`pt-10 pb-10 pl-6 pr-6 ${styles.content} ${styles.mainContent}`}>
					<Routes location={state?.backgroundLocation && (currentIngredient || currentOrder) ? state?.backgroundLocation : location}>
						<Route path="/" element={<Home />} />
						<Route path="*" element={<NonExistentPage />} />
						<Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
						<Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
						<Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
						<Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
						<Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
						<Route path="/ingredients/:id" element={<Ingredients />} />
						<Route path="/profile/orders" element={<OnlyAuth component={<Orders />} />} />
						<Route path="/profile/orders/:id" element={<OnlyAuth component={<Order />} />} />
						<Route path="/feed" element={<Feed />} />
						<Route path="/feed/:id" element={<Order />} />
					</Routes>

					{state?.backgroundLocation && currentIngredient && (
						<Routes>
							<Route path="/ingredients/:id" element={(
								<Modal title="Детали ингредиента" onClose={handleCloseModalIngredient}>
									<IngredientDetails ingredient={currentIngredient} />
								</Modal>
							)} />
						</Routes>
					)}

					{state?.backgroundLocation && currentOrder && (
						<Routes>
							<Route path="/feed/:id" element={(
								<Modal
									title={<div className="text text_type_digits-default">#{currentOrder.number}</div>}
									onClose={() => handleCloseModalOrder('/feed')}
								>
									<OrderInfo data={currentOrder} />
								</Modal>
							)} />

							<Route path="/profile/orders/:id" element={(
								<Modal
									title={<div className="text text_type_digits-default">#{currentOrder.number}</div>}
									onClose={() => handleCloseModalOrder('/profile/orders')}
								>
									<OrderInfo data={currentOrder} />
								</Modal>
							)} />
						</Routes>
					)}
				</main>
			</Provider>
		</div>
	);
}

export default App;
