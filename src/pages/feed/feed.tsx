import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OrderCard from '../../components/order-card/order-card';
import OrderNumber from '../../components/order-number/order-number';
import LuminousText from '../../components/luminous-text/luminous-text';
import { useDispatch, useSelector } from '../../services/store';
import { WebsocketStatus } from '../../types/socket';
import { IOrderResultType } from '../../utils/types';
import {
	connect as orderFeedConnect,
	disconnect as orderFeedDisconnect,
} from '../../services/order-feed/actions';
import { getIngredients } from '../../services/ingredients/actions';
import { SET_CURRENT_ORDER } from '../../services/current-order/actions';

import styles from './feed.module.css';

interface IOrderPanelData {
	done: Array<number>;
	processing: Array<number>;
}

const MAX_COUNT_ORDERS_ON_PANEL = 20;

const Feed = (): JSX.Element => {
	const dispatch = useDispatch();
	const { ingredients } = useSelector(store => store.ingredients);
	const { orderFeed, status, total, totalToday } = useSelector(store => store.orderFeed);
	const [orderPanelData, setOrderPanelData] = useState<IOrderPanelData | null>(null);
	const isDisconnected: boolean = status !== WebsocketStatus.OPEN;
	const location = useLocation();

	useEffect(() => {
		if (!ingredients) {
			// @ts-ignore
			dispatch(getIngredients());
		}

		//@ts-ignore
		dispatch(orderFeedConnect('wss://norma.nomoreparties.space/orders/all'));

		return () => {
			//@ts-ignore
			dispatch(orderFeedDisconnect());
		};
	}, []);

	useEffect(() => {
		const ordersData = orderFeed.reduce(
			(acc: IOrderPanelData, item: IOrderResultType) => {
				if (item.status) {
					switch (item.status) {
						case 'done': {
							if (acc.done.length < MAX_COUNT_ORDERS_ON_PANEL) {
								return {
									...acc,
									done: [
										...acc.done,
										item.number,
									],
								};
							} else {
								return acc;
							}
						}
						default: {
							if (acc.processing.length < MAX_COUNT_ORDERS_ON_PANEL) {
								return {
									...acc,
									processing: [
										...acc.processing,
										item.number,
									],
								};
							} else {
								return acc;
							}
						}
					};
				} else {
					return acc;
				}
			},
			{
				done: [],
				processing: [],
			}
		);

		setOrderPanelData(ordersData);
	}, [orderFeed]);

	const handleOpenModal = (order: IOrderResultType): void => {
		console.log(order);
		//@ts-ignore
		dispatch({
			type: SET_CURRENT_ORDER,
			payload: order,
		});
	};

	return (
		<section>
			<h1 className="pl-5 pr-5 mb-5">
				Лента заказов
			</h1>
			<div className={styles.row}>
				<div className={styles.column}>
					{orderFeed.length && (
						<ul className={styles.orders}>
							{orderFeed.map((item: IOrderResultType, index: number) =>
								<li key={index}>
									<Link
										className={styles.link}
										to={`/feed/:${item.number}`}
										state={{ backgroundLocation: location }}
										onClick={() => handleOpenModal(item)}
									>
										<OrderCard
											name={item.name}
											number={item.number}
											createdAt={item.createdAt}
											ingredients={item.ingredients}
										/>
									</Link>
								</li>
							)}
						</ul>
					)}
				</div>
				<div className={`${styles.column} ${styles.panel}`}>
					<div className={styles.orderPanel}>
						<div className={styles.column}>
							<p className="text text_type_main-medium mb-6">Готовы:</p>
							<div className={styles.numbersColumn}>
								{orderPanelData && orderPanelData.done && (
									orderPanelData.done.map((item, index) => (
										<OrderNumber number={item} status="done" key={index} />
									))
								)}
							</div>
						</div>
						<div className={styles.column}>
							<p className="text text_type_main-medium mb-6">В работе:</p>
							<div className={styles.numbersColumn}>
								{orderPanelData && orderPanelData.processing && (
									orderPanelData.processing.map((item, index) => (
										<OrderNumber number={item} key={index} />
									))
								)}
							</div>
						</div>
					</div>
					<div>
						<p className="text text_type_main-medium">Выполнено за всё время:</p>
						<LuminousText text={total} type="large" />
					</div>
					<div>
						<p className="text text_type_main-medium">Выполнено за сегодня:</p>
						<LuminousText text={totalToday} type="large" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Feed;
