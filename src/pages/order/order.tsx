import { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import OrderInfo from '../../components/order-info/order-info';
import { DELETE_CURRENT_ORDER, SET_CURRENT_ORDER } from '../../services/current-order/actions';
import { useDispatch, useSelector } from '../../services/store';
import { BASE_URL } from '../../utils/constants';
import { getResponse } from '../../utils/request-utils';
import { IOrderResultType } from '../../utils/types';

import styles from './order.module.css';

const getOrderNumberFromPath = (): null | string => {
	const pathnameParts: Array<string> = window.location.pathname.split('/');
	let result: null | string = null;

	if (pathnameParts.length > 1) {
		result = pathnameParts[pathnameParts.length - 1].replace(':', '');
	}

	return result;
};

const findOrderData = (orders: Array<IOrderResultType>, number: string) => {
	//@ts-ignore
	const result: Array<IOrderResultType> = orders.find(el => el.number === number);

	return result.length ? result[0] : null;
};

const Order = (): JSX.Element => {
	const dispatch = useDispatch();
	const { currentOrder } = useSelector(store => store.currentOrder);
	const { orderFeed } = useSelector(store => store.orderFeed);
	const { ordersHistory } = useSelector(store => store.ordersHistory);
	const [loaderStatus, setLoaderStatus] = useState<boolean>(true);

	useEffect(() => {
		if (!currentOrder) {
			const orderNumber = getOrderNumberFromPath();

			if (orderNumber) {
				let cycleCount: number = 0;
				while (!currentOrder && cycleCount < 3) {
					switch (cycleCount) {
						case 0:
							if (orderFeed.length) {
								const result = findOrderData(orderFeed, orderNumber);

								if (result) {
									dispatch({
										type: SET_CURRENT_ORDER,
										payload: result,
									});
								}
							}
							break;
						case 1:
							if (ordersHistory.length) {
								const result = findOrderData(ordersHistory, orderNumber);

								if (result) {
									dispatch({
										type: SET_CURRENT_ORDER,
										payload: result,
									});
								}
							}
							break;
						case 2:
							fetch(`${BASE_URL}orders/${orderNumber}`)
								.then(res => getResponse(res))
								.then(res => {
									setLoaderStatus(false);
									console.log(res);
									//@ts-ignore
									if (res.success && res?.orders.length) {
										//@ts-ignore
										dispatch({
											type: SET_CURRENT_ORDER,
											//@ts-ignore
											payload: res.orders[0],
										});
									}
								})
								.catch(err => {
									setLoaderStatus(false);
									console.error(`Произошла ошибка: ${err}`);

									dispatch({
										type: DELETE_CURRENT_ORDER,
									});
								});
							break;
						default:
							dispatch({
								type: DELETE_CURRENT_ORDER,
							});
							break;
					};

					cycleCount++;
				}
			}
		}
		
	}, []);

	return (
		<>
			{loaderStatus && (
				<Loader />
			)}
			{!loaderStatus && currentOrder && (
				<section className={`mt-20 ${styles.container}`}>
					<div className={`text text_type_digits-default mb-8 ${styles.title}`}>#{currentOrder.number}</div>
					<OrderInfo data={currentOrder} />
				</section>
			)}
			{!loaderStatus && !currentOrder && (
				<h1>Заказ не найден</h1>
			)}
		</>
	);
};

export default Order;
