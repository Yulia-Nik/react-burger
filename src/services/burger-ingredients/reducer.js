import { v4 as uuidv4 } from 'uuid';
import {
	ADD_FILLING,
	ADD_BUN,
	DELETE_BURGER_INGREDIENT,
	DELETE_ALL_BURGER_INGREADIENTS,
	UPDATE_FILLING_INGREDIENTS,
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
		case DELETE_ALL_BURGER_INGREADIENTS:
			return {
				...state,
				burgerIngredients: initialState.burgerIngredients,
			};
		case UPDATE_FILLING_INGREDIENTS: {
			const updateFilling = [...state.burgerIngredients.filling];
			updateFilling.splice(action.payload.hoverIndex, 0, updateFilling.splice(action.payload.dragIndex, 1)[0]);
			return {
				...state,
				burgerIngredients: {
					...state.burgerIngredients,
					filling: updateFilling
				}
			};
		}
		default:
			return state;
	};
};