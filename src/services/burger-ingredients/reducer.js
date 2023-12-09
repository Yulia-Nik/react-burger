import { v4 as uuidv4 } from 'uuid';
import {
	ADD_FILLING,
	ADD_BUN,
	DELETE_BURGER_INGREDIENT,
} from './actions';

const initialState = {
	burgerIngredients: {
		bun: null,
		filling: [],
	}
};

export const burgerIngredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_FILLING:
			return {
				...state,
				burgerIngredients: {
					...state.burgerIngredients,
					filling: [
						...state.burgerIngredients.filling,
						{
							...action.payload,
							ingredientId: uuidv4(),
						},
					],
				},
			};
		case ADD_BUN:
			return {
				...state,
				burgerIngredients: {
					...state.burgerIngredients,
					bun: action.payload,
				}
			};
		case DELETE_BURGER_INGREDIENT:
			return {
				...state,
				burgerIngredients: {
					...state.burgerIngredients,
					filling: state.burgerIngredients.filling.filter(el => el.ingredientId !== action.payload.ingredientId)
				},
			};
		default:
			return state;
	};
};