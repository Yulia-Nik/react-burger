import { createAction } from '@reduxjs/toolkit';

export const connect = createAction<string, 'ORDERS_HISTORY_CONNECT'>('ORDERS_HISTORY_CONNECT');
export const disconnect = createAction('ORDERS_HISTORY_DISCONNECT');

export const wsConnecting = createAction('ORDERS_HISTORY_WS_CONNECTING');
export const wsOpen = createAction('ORDERS_HISTORY_WS_OPEN');
export const wsClose = createAction('ORDERS_HISTORY_WS_CLOSE');
export const wsError = createAction<string, 'ORDERS_HISTORY_WS_ERROR'>('ORDERS_HISTORY_WS_ERROR');
export const wsMessage = createAction<any, 'ORDERS_HISTORY_WS_MESSAGE'>('ORDERS_HISTORY_WS_MESSAGE');

export type TOrderFeedActions =
	ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof wsConnecting>
	| ReturnType<typeof wsOpen>
	| ReturnType<typeof wsClose>
	| ReturnType<typeof wsError>
	| ReturnType<typeof wsMessage>;
