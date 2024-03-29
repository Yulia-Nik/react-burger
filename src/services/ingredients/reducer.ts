import { formatIngredientsData } from '../../utils/data-utils';
import { IResultIngredientsData } from '../../utils/types';
import {
	GET_INGREDIENTS_LIST,
	GET_INGREDIENTS_LIST_SUCCESS,
	GET_INGREDIENTS_LIST_FAILED,
	TIngredientsActions,
} from './actions';

export interface IIngredientsStore {
	ingredients: IResultIngredientsData | null;
	isLoading: boolean;
	error: any;
}

const initialState: IIngredientsStore = {
	ingredients: null,
	isLoading: false,
	error: null,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): IIngredientsStore => {
	switch (action.type) {
		case GET_INGREDIENTS_LIST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case GET_INGREDIENTS_LIST_SUCCESS:
			return {
				...state,
				ingredients: formatIngredientsData(action.payload),
				isLoading: false,
			};
		case GET_INGREDIENTS_LIST_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	};
};
