// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { IIngredientType, IBurgerIngredientType } from '../../utils/types';

interface IAddFillingIngridientAction {
	type: typeof ADD_FILLING;
	payload: IBurgerIngredientType;
}

interface IBurgerIngredientActions {
	type: TBurgerIngredientActionTypes;
	payload: IBurgerIngredientType;
}

interface IUpdateFillingIngredientsAction {
	type: typeof UPDATE_FILLING_INGREDIENTS;
	payload: {
		hoverIndex: number;
		dragIndex: number;
	};
}

type TBurgerIngredientActionTypes = typeof ADD_FILLING
	| typeof ADD_BUN
	| typeof DELETE_BURGER_INGREDIENT
	| typeof DELETE_ALL_BURGER_INGREADIENTS;

export type TBurgerIngredientsActions = IBurgerIngredientActions | IUpdateFillingIngredientsAction;

export const ADD_FILLING: 'ADD_FILLING' = 'ADD_FILLING';

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';

export const DELETE_BURGER_INGREDIENT: 'DELETE_BURGER_INGREDIENT' = 'DELETE_BURGER_INGREDIENT';

export const DELETE_ALL_BURGER_INGREADIENTS: 'DELETE_ALL_BURGER_INGREADIENTS' = 'DELETE_ALL_BURGER_INGREADIENTS';

export const UPDATE_FILLING_INGREDIENTS: 'UPDATE_FILLING_INGREDIENTS' = 'UPDATE_FILLING_INGREDIENTS';

export const addFillingIngridient = (item: IIngredientType): IAddFillingIngridientAction => {
	return {
		type: ADD_FILLING,
		payload: {
			...item,
			ingredientId: uuidv4(),
		}
	};
};
