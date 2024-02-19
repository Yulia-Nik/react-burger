import { currentOrderReducer as reducer } from './reducer';
import * as actions from './actions';

describe('Current order reducers', () => {
	it('Should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			currentOrder: null
		});
	});

	it('Should handle SET_CURRENT_ORDER', () => {
		expect(reducer(
			{
				currentOrder: null
			},
			{
				type: actions.SET_CURRENT_ORDER,
				payload: { number: 'example' },
			}
		)).toEqual({
			currentOrder: { number: 'example' }
		});
	});

	it('Should handle DELETE_CURRENT_ORDER', () => {
		expect(reducer(
			{
				currentOrder: { number: 'example' }
			},
			{
				type: actions.DELETE_CURRENT_ORDER,
			}
		)).toEqual({
			currentOrder: null
		});
	});
});
