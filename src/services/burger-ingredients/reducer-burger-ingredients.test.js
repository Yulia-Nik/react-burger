import { burgerIngredientsReducer as reducer } from './reducer';
import * as actions from './actions';

describe('Burger ingredients reducers', () => {
	it('Should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			burgerIngredients: {
				bun: null,
				filling: [],
			}
		});
	});

	it('Should handle ADD_FILLING with empty state', () => {
		expect(reducer(
			{
				burgerIngredients: {
					bun: null,
					filling: [],
				}
			},
			{
				type: actions.ADD_FILLING,
				payload: { name: 'example' }
			}
		)).toEqual({
			burgerIngredients: {
				bun: null,
				filling: [{
					name: 'example'
				}],
			}
		});
	});

	it('Should handle ADD_FILLING with non-empty state', () => {
		expect(reducer(
			{
				burgerIngredients: {
					bun: null,
					filling: [
						{ name: 'example_1' },
						{ name: 'example_2' },
					],
				}
			},
			{
				type: actions.ADD_FILLING,
				payload: { name: 'example_3' }
			}
		)).toEqual({
			burgerIngredients: {
				bun: null,
				filling: [
					{ name: 'example_1' },
					{ name: 'example_2' },
					{ name: 'example_3' },
				],
			}
		});
	});

	it('Should handle ADD_BUN with empty state', () => {
		expect(reducer(
			{
				burgerIngredients: {
					bun: null,
					filling: [],
				}
			},
			{
				type: actions.ADD_BUN,
				payload: { name: 'example' }
			}
		)).toEqual({
			burgerIngredients: {
				bun: { name: 'example' },
				filling: [],
			}
		});
	});

	it('Should handle ADD_BUN with non-empty state', () => {
		expect(reducer(
			{
				burgerIngredients: {
					bun: { name: 'example_1' },
					filling: [],
				}
			},
			{
				type: actions.ADD_BUN,
				payload: { name: 'example_2' }
			}
		)).toEqual({
			burgerIngredients: {
				bun: { name: 'example_2' },
				filling: [],
			}
		});
	});

	it('Should handle DELETE_BURGER_INGREDIENT', () => {
		expect(reducer(
			{
				burgerIngredients: {
					bun: null,
					filling: [
						{ name: 'example_1', ingredientId: '1' },
						{ name: 'example_2', ingredientId: '2' },
						{ name: 'example_3', ingredientId: '3' },
					],
				}
			},
			{
				type: actions.DELETE_BURGER_INGREDIENT,
				payload: { name: 'example_2', ingredientId: '2' },
			}
		)).toEqual({
			burgerIngredients: {
				bun: null,
				filling: [
					{ name: 'example_1', ingredientId: '1' },
					{ name: 'example_3', ingredientId: '3' },
				],
			},
		});
	});

	it('Should handle DELETE_ALL_BURGER_INGREADIENTS', () => {
		expect(reducer(
			{
				burgerIngredients: {
					bun: { name: 'example_4', ingredientId: '4' },
					filling: [
						{ name: 'example_1', ingredientId: '1' },
						{ name: 'example_2', ingredientId: '2' },
						{ name: 'example_3', ingredientId: '3' },
					],
				}
			},
			{
				type: actions.DELETE_ALL_BURGER_INGREADIENTS,
			}
		)).toEqual({
			burgerIngredients: {
				bun: null,
				filling: [],
			},
		});
	});

	it('Should handle UPDATE_FILLING_INGREDIENTS', () => {
		expect(reducer(
			{
				burgerIngredients: {
					bun: null,
					filling: [
						{ name: 'example_1', ingredientId: '1' },
						{ name: 'example_2', ingredientId: '2' },
						{ name: 'example_3', ingredientId: '3' },
					],
				}
			},
			{
				type: actions.UPDATE_FILLING_INGREDIENTS,
				payload: {
					dragIndex: 0,
					hoverIndex: 2,
				},
			}
		)).toEqual({
			burgerIngredients: {
				bun: null,
				filling: [
					{ name: 'example_2', ingredientId: '2' },
					{ name: 'example_3', ingredientId: '3' },
					{ name: 'example_1', ingredientId: '1' },
				],
			}
		});
	});
});
