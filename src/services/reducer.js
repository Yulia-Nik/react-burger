import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients/reducer';
import { burgerIngredientsReducer } from './burger-ingredients/reducer';
import { currentIngredientReducer } from './current-ingredient/reducer';
import { orderReducer } from './order/reducer';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burgerIngredients: burgerIngredientsReducer,
	currentIngredient: currentIngredientReducer,
	order: orderReducer,
});
