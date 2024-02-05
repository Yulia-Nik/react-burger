import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients/reducer';
import { burgerIngredientsReducer } from './burger-ingredients/reducer';
import { currentIngredientReducer } from './current-ingredient/reducer';
import { orderReducer } from './order/reducer';
import { authReducer } from './auth/reducer';
import { orderFeedReducer } from './order-feed/reducer';
import { ordersHistoryReducer } from './orders-history/reducer';
import { currentOrderReducer } from './current-order/reducer';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burgerIngredients: burgerIngredientsReducer,
	currentIngredient: currentIngredientReducer,
	order: orderReducer,
	auth: authReducer,
	currentOrder: currentOrderReducer,
	orderFeed: orderFeedReducer,
	ordersHistory: ordersHistoryReducer,
});
