import * as actions from './actions';
import { ingredientsReducer as reducer } from './reducer';

describe('Ingredients reducers', () => {
	it('Should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			ingredients: null,
			isLoading: false,
			error: null,
		});
	});

	it('Should handle GET_INGREDIENTS_LIST', () => {
		expect(reducer(
			{
				ingredients: null,
				isLoading: false,
				error: null,
			},
			{
				type: actions.GET_INGREDIENTS_LIST,
			}
		)).toEqual({
			ingredients: null,
			isLoading: true,
			error: null,
		});
	});

	it('Should handle GET_INGREDIENTS_LIST_SUCCESS', () => {
		expect(reducer(
			{
				ingredients: null,
				isLoading: true,
				error: null,
			},
			{
				type: actions.GET_INGREDIENTS_LIST_SUCCESS,
				payload: [
					{ name: 'example_1', type: 'bun' },
					{ name: 'example_2', type: 'sauce' },
				]
			}
		)).toEqual({
			ingredients: {
				bun: [{ name: 'example_1', type: 'bun' }],
				sauce: [{ name: 'example_2', type: 'sauce' }]
			},
			isLoading: false,
			error: null,
		});
	});

	it('Should handle GET_INGREDIENTS_LIST_FAILED', () => {
		expect(reducer(
			{
				ingredients: null,
				isLoading: true,
				error: null,
			},
			{
				type: actions.GET_INGREDIENTS_LIST_FAILED,
				payload: { error: '500'},
			}
		)).toEqual({
			ingredients: null,
			isLoading: false,
			error: { error: '500'},
		});
	});
});
