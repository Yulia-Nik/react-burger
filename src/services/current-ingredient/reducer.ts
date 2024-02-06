import { IIngredientType } from '../../utils/types';
import {
	SET_CURRENT_INGREDIENT,
	DELETE_CURRENT_INGREDIENT,
	TCurrentIngredientActions,
} from './actions';

interface ICurrentIngredientStore {
	currentIngredient: IIngredientType | null;
}

const initialState: ICurrentIngredientStore = {
	currentIngredient: null,
};

export const currentIngredientReducer = (state = initialState, action: TCurrentIngredientActions): ICurrentIngredientStore => {
	switch (action.type) {
		case SET_CURRENT_INGREDIENT:
			return {
				...state,
				currentIngredient: action.payload,
			};
		case DELETE_CURRENT_INGREDIENT:
			return {
				...state,
				currentIngredient: null,
			};
		default:
			return state;
	};
};
