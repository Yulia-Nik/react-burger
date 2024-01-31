import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
	TypedUseSelectorHook,
} from 'react-redux';
import { ThunkAction, configureStore } from "@reduxjs/toolkit";
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

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(orderFeedMiddleware);
	},
});

// Типизация стора
export type AppDispatch = ReturnType<typeof store.dispatch>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
