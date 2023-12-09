import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients/reducer';
import { burgerIngredientsReducer } from './burger-ingredients/reducer';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burgerIngredients: burgerIngredientsReducer,
});
