import { IIngredientType } from '../../utils/types';

export const SET_CURRENT_INGREDIENT: 'SET_CURRENT_INGREDIENT' = 'SET_CURRENT_INGREDIENT';

export const DELETE_CURRENT_INGREDIENT: 'DELETE_CURRENT_INGREDIENT' = 'DELETE_CURRENT_INGREDIENT';

interface ISetCurrentIngredientAction {
	type: typeof SET_CURRENT_INGREDIENT;
	payload: IIngredientType;
}

interface IDeleteCurrentIngredientAction {
	type: typeof DELETE_CURRENT_INGREDIENT;
}

export type TCurrentIngredientActions = ISetCurrentIngredientAction | IDeleteCurrentIngredientAction;
