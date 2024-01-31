import { createReducer } from '@reduxjs/toolkit';
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './actions';
import { WebsocketStatus } from '../../types/socket';
import { IOrderResultType } from '../../utils/types';

interface IOrderFeedStore {
	status: WebsocketStatus;
	orderFeed: Array<IOrderResultType>;
	error: string;
	total: number;
	totalToday: number;
}

const initialState: IOrderFeedStore = {
	status: WebsocketStatus.CLOSED,
	orderFeed: [],
	error: '',
	total: 0,
	totalToday: 0,
};

export const orderFeedReducer = createReducer(initialState, builder => {
	builder
		.addCase(wsConnecting, state => {
			state.status = WebsocketStatus.CONNECTING;
		})
		.addCase(wsOpen, state => {
			state.status = WebsocketStatus.OPEN;
		})
		.addCase(wsClose, state => {
			state.status = WebsocketStatus.CLOSED;
		})
		.addCase(wsError, (state, action) => {
			state.error = action.payload;
		})
		.addCase(wsMessage, (state, action) => {
			console.log(action);
			const ordersData = action.payload.success && action.payload.orders ? action.payload.orders : [];
			state.orderFeed = ordersData; //[...state.orderFeed, ...ordersData];
			state.total = action.payload.total || 0;
			state.totalToday = action.payload.totalToday || 0;
		});
});
