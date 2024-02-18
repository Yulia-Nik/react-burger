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
});
