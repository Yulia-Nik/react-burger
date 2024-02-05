import { IOrderResultType } from '../../utils/types';
import {
	SET_CURRENT_ORDER,
	DELETE_CURRENT_ORDER,
	ICurrentOrderActions,
} from './actions';

interface ICurrentOrderStore {
	currentOrder: IOrderResultType | null;
}

const initialState: ICurrentOrderStore = {
	currentOrder: null,
};

export const currentOrderReducer = (state = initialState, action: ICurrentOrderActions): ICurrentOrderStore => {
	switch (action.type) {
		case SET_CURRENT_ORDER:
			return {
				...state,
				currentOrder: action.payload,
			};
		case DELETE_CURRENT_ORDER:
			return {
				...state,
				currentOrder: null,
			};
		default:
			return state;
	}
};
