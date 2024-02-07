import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import OrderCard from '../../components/order-card/order-card';
import ProfileSidebar from '../../components/profile-sidebar/profile-sidebar';
import { useDispatch, useSelector } from '../../services/store';
import {
	connect as ordersHistoryConnect,
	disconnect as ordersHistoryDisconnect,
} from '../../services/orders-history/actions';
import { getIngredients } from '../../services/ingredients/actions';
import { SET_CURRENT_ORDER } from '../../services/current-order/actions';
import { ACCESS_TOKEN_STORAGE_KEY } from '../../utils/constants';
import { IOrderResultType } from '../../utils/types';

import styles from './orders.module.css';

const Orders = (): JSX.Element => {
	const dispatch = useDispatch();
	const { ingredients } = useSelector(store => store.ingredients);
	const { ordersHistory } = useSelector(store => store.ordersHistory);
	const location = useLocation();

	useEffect(() => {
		if (!ingredients) {
			dispatch(getIngredients());
		}

		dispatch(ordersHistoryConnect(`wss://norma.nomoreparties.space/orders?token=${localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)}`));

		return () => {
			dispatch(ordersHistoryDisconnect());
		};
	}, []);

	const handleOpenModal = (order: IOrderResultType): void => {
		dispatch({
			type: SET_CURRENT_ORDER,
			payload: order,
		});
	};

	return (
		<>
			<ProfileSidebar />
			<section className={styles.orders}>
				{ordersHistory.length && (
					<ul className={styles.list}>
						{ordersHistory.map((item, index) =>
							<li key={index}>
								<Link
									className={styles.link}
									to={`/profile/orders/:${item.number}`}
									state={{ backgroundLocation: location }}
									onClick={() => handleOpenModal(item)}
								>
									<OrderCard
										name={item.name}
										number={item.number}
										createdAt={item.createdAt}
										ingredients={item.ingredients}
										status={item.status}
									/>
								</Link>
							</li>
						)}
					</ul>
				)}
			</section>
		</>
	);
};

export default Orders;
