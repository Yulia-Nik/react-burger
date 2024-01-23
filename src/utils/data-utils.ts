import { IIngredientType, IResultIngredientsData } from './types';

interface IBurgerIngredients {
	bun:  IIngredientType;
	filling: Array<IIngredientType>;
}

/**
 * Преобразует массив ингредиентов в объект с группировкой по катигориям ингредиентов
 * 
 * @param {Array} data - исходный массив ингредиентов
 * @returns {Object}
 */
export const formatIngredientsData = (data: Array<IIngredientType>): IResultIngredientsData => {
	const result = data.reduce(
		(acc: IResultIngredientsData, elem: IIngredientType) => {
			const newType = Object.keys(acc).indexOf(elem.type) === -1;

			if (newType) {
				return {
					...acc,
					[elem.type]: [
						elem
					]
				};
			} else {
				return {
					...acc,
					[elem?.type]: [
						...acc[elem.type] as Array<IIngredientType>,
						elem,
					]
				};
			}
		},
		{}
	);

	return result;
};

/**
 * Возвращает количество конкретного ингредиента в бургере
 * 
 * @param {String} type - тип ингредиента: булка (bun) или другие (filling)
 * @param {String} id - id ингредиента
 * @param {Object} burgerIngredients - объект ингредиентов бургера
 * 
 * @returns {number}
 */
export const getIngredientCount = (type: 'bun' | 'main' | 'sauce', id: string, burgerIngredients: IBurgerIngredients): number => {
	if (type === 'bun') {
		const isAdded = burgerIngredients.bun && burgerIngredients.bun._id === id;
		return isAdded ? 2 : 0;
	} else {
		return burgerIngredients.filling.filter(el => el._id === id).length;
	}
};

/**
 * Вычисляет стоимость собранного бургера
 * 
 * @param {Object} burgerIngredients - объект ингредиентов бургера
 * @returns {number}
 */
export const getBurgerPrice = (burgerIngredients: IBurgerIngredients): number => {
	let price = burgerIngredients.bun ? 2 * burgerIngredients.bun.price : 0;
	burgerIngredients.filling.forEach(ingredient => {
		price += ingredient.price;
	});

	return price;
};

/**
 * Возвращает массив id ингредиентов для отправки запроса создания заказа
 * 
 * @param {Object} data - объект ингредиентов бургера
 * @returns {Array}
 */
export const getOrderDataForRequest = (data: IBurgerIngredients): Array<string> => {
	const result = data.bun ? [data.bun._id] : [];
	data.filling.forEach(el => {
		result.push(el._id);
	});
	result.push(data.bun._id);

	return result;
};

export const getIngredientById = (ingredients: IResultIngredientsData, id: string): IIngredientType | null => {
	let targetIngredient = null;
	Object.keys(ingredients).forEach((key: string) => {
		// @ts-ignore
		ingredients[key].forEach((elem: IIngredientType) => {
			if (elem._id === id) {
				targetIngredient = elem;
			}
		});
	});

	return targetIngredient;
};
