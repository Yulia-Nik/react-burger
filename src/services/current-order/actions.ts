import { IOrderResultType } from '../../utils/types';

export const SET_CURRENT_ORDER: 'SET_CURRENT_ORDER' = 'SET_CURRENT_ORDER';

export const DELETE_CURRENT_ORDER: 'DELETE_CURRENT_ORDER' = 'DELETE_CURRENT_ORDER';

interface ISetCurrentOrderAction {
	type: typeof SET_CURRENT_ORDER;
	payload: IOrderResultType;
}

interface IDeleteCurrentOrderAction {
	type: typeof DELETE_CURRENT_ORDER;
}

export type TCurrentOrderActions = ISetCurrentOrderAction | IDeleteCurrentOrderAction;
