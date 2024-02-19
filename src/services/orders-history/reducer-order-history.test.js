import { ordersHistoryReducer as reducer } from './reducer';
import { WebsocketStatus } from '../../types/socket';

describe('Order feed reducers', () => {
	it('Should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			status: WebsocketStatus.CLOSED,
			ordersHistory: [],
			error: '',
			total: 0,
			totalToday: 0,
		});
	});

	it('Should handle ORDERS_HISTORY_WS_CONNECTING', () => {
		expect(reducer(
			{
				status: WebsocketStatus.CLOSED,
				ordersHistory: [],
				error: '',
				total: 0,
				totalToday: 0,
			},
			{
				type: 'ORDERS_HISTORY_WS_CONNECTING',
			}
		)).toEqual({
			status: WebsocketStatus.CONNECTING,
			ordersHistory: [],
			error: '',
			total: 0,
			totalToday: 0,
		});
	});

	it('Should handle ORDERS_HISTORY_WS_OPEN', () => {
		expect(reducer(
			{
				status: WebsocketStatus.CONNECTING,
				ordersHistory: [],
				error: '',
				total: 0,
				totalToday: 0,
			},
			{
				type: 'ORDERS_HISTORY_WS_OPEN',
			}
		)).toEqual({
			status: WebsocketStatus.OPEN,
			ordersHistory: [],
			error: '',
			total: 0,
			totalToday: 0,
		});
	});

	it('Should handle ORDERS_HISTORY_WS_CLOSE', () => {
		expect(reducer(
			{
				status: WebsocketStatus.OPEN,
				ordersHistory: [],
				error: '',
				total: 0,
				totalToday: 0,
			},
			{
				type: 'ORDERS_HISTORY_WS_CLOSE',
			}
		)).toEqual({
			status: WebsocketStatus.CLOSED,
			ordersHistory: [],
			error: '',
			total: 0,
			totalToday: 0,
		});
	});

	it('Should handle ORDERS_HISTORY_WS_ERROR', () => {
		expect(reducer(
			{
				status: WebsocketStatus.OPEN,
				ordersHistory: [],
				error: '',
				total: 0,
				totalToday: 0,
			},
			{
				type: 'ORDERS_HISTORY_WS_ERROR',
				payload: 'Error',
			}
		)).toEqual({
			status: WebsocketStatus.OPEN,
			ordersHistory: [],
			error: 'Error',
			total: 0,
			totalToday: 0,
		});
	});

	it('Should handle ORDERS_HISTORY_WS_MESSAGE be success', () => {
		expect(reducer(
			{
				status: WebsocketStatus.OPEN,
				ordersHistory: [],
				error: '',
				total: 0,
				totalToday: 0,
			},
			{
				type: 'ORDERS_HISTORY_WS_MESSAGE',
				payload: {
					success: true,
					orders: [{number: 1}, {number: 2}],
				},
			}
		)).toEqual({
			status: WebsocketStatus.OPEN,
			ordersHistory: [{number: 2}, {number: 1}],
			error: '',
			total: 0,
			totalToday: 0,
		});
	});

	it('Should handle ORDERS_HISTORY_WS_MESSAGE be failed', () => {
		expect(reducer(
			{
				status: WebsocketStatus.OPEN,
				ordersHistory: [{number: 1}, {number: 2}],
				error: '',
				total: 0,
				totalToday: 0,
			},
			{
				type: 'ORDERS_HISTORY_WS_MESSAGE',
				payload: {
					success: false,
				},
			}
		)).toEqual({
			status: WebsocketStatus.OPEN,
			ordersHistory: [],
			error: '',
			total: 0,
			totalToday: 0,
		});
	});
});
