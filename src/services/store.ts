import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
	TypedUseSelectorHook,
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import {
	connect as OrderFeedWSConnect,
	disconnect as OrderFeedWSDisconnect,
	wsConnecting as OrderFeedWSConnecting,
	wsOpen as OrderFeedWSOpen,
	wsClose as OrderFeedWSClose,
	wsError as OrderFeedWSError,
	wsMessage as OrderFeedWSMessage,
} from './order-feed/actions';
import {
	connect as OrdersHistoryWSConnect,
	disconnect as OrdersHistoryWSDisconnect,
	wsConnecting as OrdersHistoryWSConnecting,
	wsOpen as OrdersHistoryWSOpen,
	wsClose as OrdersHistoryWSClose,
	wsError as OrdersHistoryWSError,
	wsMessage as OrdersHistoryWSMessage,
} from './orders-history/actions';

export type RootState = ReturnType<typeof rootReducer>;

const orderFeedMiddleware = socketMiddleware({
	wsConnect: OrderFeedWSConnect,
	wsDisconnect: OrderFeedWSDisconnect,
	wsConnecting: OrderFeedWSConnecting,
	onOpen: OrderFeedWSOpen,
	onClose: OrderFeedWSClose,
	onError: OrderFeedWSError,
	onMessage: OrderFeedWSMessage,
});

const ordersHistoryMiddleware = socketMiddleware({
	wsConnect: OrdersHistoryWSConnect,
	wsDisconnect: OrdersHistoryWSDisconnect,
	wsConnecting: OrdersHistoryWSConnecting,
	onOpen: OrdersHistoryWSOpen,
	onClose: OrdersHistoryWSClose,
	onError: OrdersHistoryWSError,
	onMessage: OrdersHistoryWSMessage,
}, true);

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(orderFeedMiddleware)
			.concat(ordersHistoryMiddleware);
	},
});

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
