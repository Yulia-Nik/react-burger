import { useEffect } from 'react';
import Loader from '../../components/loader/loader';
import OrderInfo from '../../components/order-info/order-info';
import { useDispatch, useSelector } from '../../services/store';

import styles from './order.module.css';

//@ts-ignore
const findOrderData = (orders, number) => {
	//@ts-ignore
	const result = orders.find(el => el.number === number);

	return result.length ? result[0] : null;
};

const Order = (): JSX.Element => {
	const dispatch = useDispatch();
	const { currentOrder } = useSelector(store => store.currentOrder);
	const { orderFeed } = useSelector(store => store.orderFeed);
	const { ordersHistory } = useSelector(store => store.ordersHistory);
	const { ingredients, isLoading } = useSelector(store => store.ingredients);

	useEffect(() => {
		const pathnameParts = window.location.pathname.split('/');
		if (pathnameParts.length > 1) {
			const parentPage = pathnameParts[1];
			const orderNumber = pathnameParts[2].replace(':', '');

			if (orderFeed.length) {
				console.log(findOrderData(orderFeed, orderNumber));
			}
		}
	}, [orderFeed]);

	return (
		<>
			{isLoading && (
				<Loader />
			)}
			{!isLoading && currentOrder && (
				<section className={`mt-20`}>
					<div className="text text_type_digits-default mb-8">{currentOrder.number}</div>
					<OrderInfo data={currentOrder} />
				</section>
			)}
			{!isLoading && (
				<h1>Ингредиент не найден</h1>
			)}
		</>
	);
};

export default Order;
