import * as actions from './actions';
import { currentIngredientReducer as reducer } from './reducer';

describe('Current ingredient reducers', () => {
	it('Should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			currentIngredient: null
		});
	});

	it('Should handle SET_CURRENT_INGREDIENT with empty state', () => {
		expect(reducer(
			{
				currentIngredient: null
			},
			{
				type: actions.SET_CURRENT_INGREDIENT,
				payload: { name: 'example' },
			}
		)).toEqual({
			currentIngredient: { name: 'example' }
		});
	});

	it('Should handle SET_CURRENT_INGREDIENT with non-empty state', () => {
		expect(reducer(
			{
				currentIngredient: { name: 'example_1' }
			},
			{
				type: actions.SET_CURRENT_INGREDIENT,
				payload: { name: 'example_2' },
			}
		)).toEqual({
			currentIngredient: { name: 'example_2' }
		});
	});

	it('Should handle DELETE_CURRENT_INGREDIENT', () => {
		expect(reducer(
			{
				currentIngredient: { name: 'example' }
			},
			{
				type: actions.DELETE_CURRENT_INGREDIENT,
			}
		)).toEqual({
			currentIngredient: null
		});
	});
});
