import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from '../../components/loader/loader';
import OrderInfo from '../../components/order-info/order-info';
import { DELETE_CURRENT_ORDER, SET_CURRENT_ORDER } from '../../services/current-order/actions';
import { useDispatch, useSelector } from '../../services/store';
import { BASE_URL } from '../../utils/constants';
import { getResponse } from '../../utils/request-utils';
import { IOrderResultType } from '../../utils/types';

import styles from './order.module.css';

interface IGetOrderResponse {
	success: boolean;
	orders: Array<IOrderResultType>;
}

const findOrderData = (orders: Array<IOrderResultType>, number: string): IOrderResultType | null => {
	const result: IOrderResultType | null = orders.find(el => String(el.number) === number) || null;

	return result;
};

const Order = (): JSX.Element => {
	const dispatch = useDispatch();
	const { currentOrder } = useSelector(store => store.currentOrder);
	const { orderFeed } = useSelector(store => store.orderFeed);
	const { ordersHistory } = useSelector(store => store.ordersHistory);
	const [loaderStatus, setLoaderStatus] = useState<boolean>(true);
	const { id: orderNumber } = useParams();

	useEffect(() => {
		if (!currentOrder && orderNumber) {
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
							.then((res: Response): Promise<IGetOrderResponse> => getResponse(res))
							.then((res: IGetOrderResponse): void => {
								setLoaderStatus(false);

								if (res.success && res?.orders.length) {
									dispatch({
										type: SET_CURRENT_ORDER,
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
