import * as actions from './actions';
import { orderReducer as reducer } from './reducer';

describe('Ingredients reducers', () => {
	it('Should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			order: null,
			isLoading: false,
			error: null,
		});
	});

	it('Should handle CREATE_ORDER', () => {
		expect(reducer(
			{
				order: null,
				isLoading: false,
				error: null,
			},
			{
				type: actions.CREATE_ORDER,
			}
		)).toEqual({
			order: null,
			isLoading: true,
			error: null,
		});
	});

	it('Should handle CREATE_ORDER_SUCCESS', () => {
		expect(reducer(
			{
				order: null,
				isLoading: true,
				error: null,
			},
			{
				type: actions.CREATE_ORDER_SUCCESS,
				payload: { number: 1 },
			}
		)).toEqual({
			order: { number: 1 },
			isLoading: false,
			error: null,
		});
	});

	it('Should handle CREATE_ORDER_FAILED', () => {
		expect(reducer(
			{
				order: null,
				isLoading: true,
				error: null,
			},
			{
				type: actions.CREATE_ORDER_FAILED,
			}
		)).toEqual({
			order: null,
			isLoading: false,
			error: null,
		});
	});

	it('Should handle CLEAR_ORDER_INFO', () => {
		expect(reducer(
			{
				order: { number: 1 },
				isLoading: false,
				error: null,
			},
			{
				type: actions.CLEAR_ORDER_INFO,
			}
		)).toEqual({
			order: null,
			isLoading: false,
			error: null,
		});
	});
});
