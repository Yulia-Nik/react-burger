import { IBurgerIngredientType } from '../../utils/types';
import {
	ADD_FILLING,
	ADD_BUN,
	DELETE_BURGER_INGREDIENT,
	DELETE_ALL_BURGER_INGREADIENTS,
	UPDATE_FILLING_INGREDIENTS,
	TBurgerIngredientsActions,
} from './actions';

interface IBurgerIngredientsStore {
	burgerIngredients: {
		bun: IBurgerIngredientType | null;
		filling: Array<IBurgerIngredientType>;
	};
}

const initialState: IBurgerIngredientsStore = {
	burgerIngredients: {
		bun: null,
		filling: [],
	}
};

export const burgerIngredientsReducer = (state = initialState, action: TBurgerIngredientsActions): IBurgerIngredientsStore => {
	switch (action.type) {
		case ADD_FILLING:
			return {
				...state,
				burgerIngredients: {
					...state.burgerIngredients,
					filling: [
						...state.burgerIngredients.filling,
						action.payload,
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
