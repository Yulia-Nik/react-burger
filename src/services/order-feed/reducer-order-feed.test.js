import { orderFeedReducer as reducer } from './reducer';
import { WebsocketStatus } from '../../types/socket';

describe('Order feed reducers', () => {
	it('Should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			status: WebsocketStatus.CLOSED,
			orderFeed: [],
			error: '',
			total: 0,
			totalToday: 0,
		});
	});

	it('Should handle ORDER_FEED_WS_CONNECTING', () => {
		expect(reducer(
			{
				status: WebsocketStatus.CLOSED,
				orderFeed: [],
				error: '',
				total: 0,
				totalToday: 0,
			},
			{
				type: 'ORDER_FEED_WS_CONNECTING',
			}
		)).toEqual({
			status: WebsocketStatus.CONNECTING,
			orderFeed: [],
			error: '',
			total: 0,
			totalToday: 0,
		});
	});

	it('Should handle ORDER_FEED_WS_OPEN', () => {
		expect(reducer(
			{
				status: WebsocketStatus.CONNECTING,
				orderFeed: [],
				error: '',
				total: 0,
				totalToday: 0,
			},
			{
				type: 'ORDER_FEED_WS_OPEN',
			}
		)).toEqual({
			status: WebsocketStatus.OPEN,
			orderFeed: [],
			error: '',
			total: 0,
			totalToday: 0,
		});
	});

	it('Should handle ORDER_FEED_WS_CLOSE', () => {
		expect(reducer(
			{
				status: WebsocketStatus.OPEN,
				orderFeed: [],
				error: '',
				total: 0,
				totalToday: 0,
			},
			{
				type: 'ORDER_FEED_WS_CLOSE',
			}
		)).toEqual({
			status: WebsocketStatus.CLOSED,
			orderFeed: [],
			error: '',
			total: 0,
			totalToday: 0,
		});
	});

	it('Should handle ORDER_FEED_WS_ERROR', () => {
		expect(reducer(
			{
				status: WebsocketStatus.OPEN,
				orderFeed: [],
				error: '',
				total: 0,
				totalToday: 0,
			},
			{
				type: 'ORDER_FEED_WS_ERROR',
				payload: 'Error',
			}
		)).toEqual({
			status: WebsocketStatus.OPEN,
			orderFeed: [],
			error: 'Error',
			total: 0,
			totalToday: 0,
		});
	});

	it('Should handle ORDER_FEED_WS_MESSAGE be success', () => {
		expect(reducer(
			{
				status: WebsocketStatus.OPEN,
				orderFeed: [],
				error: '',
				total: 0,
				totalToday: 0,
			},
			{
				type: 'ORDER_FEED_WS_MESSAGE',
				payload: {
					success: true,
					orders: [{number: 1}, {number: 2}],
					total: 10,
					totalToday: 3,
				},
			}
		)).toEqual({
			status: WebsocketStatus.OPEN,
			orderFeed: [{number: 1}, {number: 2}],
			error: '',
			total: 10,
			totalToday: 3,
		});
	});

	it('Should handle ORDER_FEED_WS_MESSAGE be failed', () => {
		expect(reducer(
			{
				status: WebsocketStatus.OPEN,
				orderFeed: [{number: 1}, {number: 2}],
				error: '',
				total: 10,
				totalToday: 3,
			},
			{
				type: 'ORDER_FEED_WS_MESSAGE',
				payload: {
					success: false,
				},
			}
		)).toEqual({
			status: WebsocketStatus.OPEN,
			orderFeed: [],
			error: '',
			total: 0,
			totalToday: 0,
		});
	});
});
