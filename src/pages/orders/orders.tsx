import { useEffect, useState } from 'react';
import OrderCard from '../../components/order-card/order-card';
import ProfileSidebar from '../../components/profile-sidebar/profile-sidebar';
import { useDispatch, useSelector } from '../../services/store';
import {
	connect as ordersHistoryConnect,
	disconnect as ordersHistoryDisconnect,
} from '../../services/orders-history/actions';
import { getIngredients } from '../../services/ingredients/actions';
import { ACCESS_TOKEN_STORAGE_KEY } from '../../utils/constants';

import styles from './orders.module.css';

const Orders = (): JSX.Element => {
	const dispatch = useDispatch();
	const { ingredients } = useSelector(store => store.ingredients);
	const { ordersHistory } = useSelector(store => store.ordersHistory);

	useEffect(() => {
		if (!ingredients) {
			//@ts-ignore
			dispatch(getIngredients());
		}

		//@ts-ignore
		dispatch(ordersHistoryConnect(`wss://norma.nomoreparties.space/orders?token=${localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)}`));

		return () => {
			//@ts-ignore
			dispatch(ordersHistoryDisconnect());
		};
	}, []);

	return (
		<>
			<ProfileSidebar />
			<section className={styles.orders}>
				{ordersHistory.length && (
					<ul className={styles.list}>
						{ordersHistory.map((item, index) =>
							<li key={index}>
								<OrderCard
									name={item.name}
									number={item.number}
									createdAt={item.createdAt}
									ingredients={item.ingredients}
									status={item.status}
								/>
							</li>
						)}
					</ul>
				)}
			</section>
		</>
	);
};

export default Orders;
