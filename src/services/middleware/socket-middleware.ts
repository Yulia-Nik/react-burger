import {
	ActionCreatorWithPayload,
	ActionCreatorWithoutPayload,
	Middleware,
} from '@reduxjs/toolkit';
import { refreshToken } from '../../utils/auth-utils';
import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from '../../utils/constants';
import { RootState } from '../store';

export type TWSActionTypes = {
	wsConnect: ActionCreatorWithPayload<string>;
	wsDisconnect: ActionCreatorWithoutPayload;
	wsSendMessage?: ActionCreatorWithPayload<any>;
	wsConnecting: ActionCreatorWithoutPayload;
	onOpen: ActionCreatorWithoutPayload;
	onClose: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	onMessage: ActionCreatorWithPayload<any>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (
	wsActions: TWSActionTypes,
	withTokenRefresh: boolean = false
): Middleware<{}, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		let isConnected = false;
		let reconnectTimer = 0;
		let url = '';
		const {
			wsConnect,
			wsDisconnect,
			wsSendMessage,
			wsConnecting,
			onOpen,
			onClose,
			onError,
			onMessage
		} = wsActions;
	
		return (next) => (action) => {
			const { dispatch } = store;
	
			if (wsConnect.match(action)) {
				socket = new WebSocket(action.payload);
				url = action.payload;
				isConnected = true;
				dispatch(wsConnecting());
		
				socket.onopen = () => {
					dispatch(onOpen());
				};
		
				socket.onerror = () => {
					dispatch(onError('Error'));
				};
		
				socket.onclose = () => {
					dispatch(onClose());
		
					if (isConnected) {
						reconnectTimer = window.setTimeout(() => {
							dispatch(wsConnect(url));
						}, RECONNECT_PERIOD);
					}
				};
		
				socket.onmessage = (event) => {
					const { data } = event;
					const parsedData = JSON.parse(data);
		
					if (withTokenRefresh && parsedData.message === 'Invalid or missing token') {
						refreshToken()
							.then((refreshData) => {
								if (!refreshData.success) {
									return Promise.reject(refreshData);
								}

								localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshData.refreshToken);
								localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, refreshData.accessToken.split('Bearer ')[1]);

								dispatch(wsConnect(url));
							})
							.catch(err => {
								dispatch(onError(err));
							});
					} else {
						dispatch(onMessage(parsedData));
					}
				}
			}

			if (socket && wsSendMessage?.match(action)) {
				socket.send(JSON.stringify(action.payload));
			}

			if (socket && wsDisconnect.match(action)) {
				clearTimeout(reconnectTimer);
				isConnected = false;
				socket.close();
				socket = null;
			}

			next(action);
		};
	};
};
