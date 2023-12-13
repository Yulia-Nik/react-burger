import { v4 as uuidv4 } from 'uuid';

export const ADD_FILLING = 'ADD_FILLING';

export const ADD_BUN = 'ADD_BUN';

export const DELETE_BURGER_INGREDIENT = 'DELETE_BURGER_INGREDIENT';

export const DELETE_ALL_BURGER_INGREADIENTS = 'DELETE_ALL_BURGER_INGREADIENTS';

export const UPDATE_FILLING_INGREDIENTS = 'UPDATE_FILLING_INGREDIENTS';

export const addFillingIngridient = item => {
	return {
		type: ADD_FILLING,
		payload: {
			...item,
			ingredientId: uuidv4(),
		}
	};
};
