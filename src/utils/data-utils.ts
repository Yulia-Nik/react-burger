import { IIngredientType, IResultIngredientsData, TIngredientsGroupNames } from './types';

interface IBurgerIngredients {
	bun:  IIngredientType | null;
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
export const getIngredientCount = (type: TIngredientsGroupNames, id: string, burgerIngredients: IBurgerIngredients): number => {
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

	if (data.bun) {
		result.push(data?.bun._id);
	}

	return result;
};

export const getIngredientById = (ingredients: IResultIngredientsData, id: string): IIngredientType | null => {
	let targetIngredient: null | IIngredientType = null;
	(Object.keys(ingredients) as Array<keyof IResultIngredientsData>).forEach(key => {
		//@ts-ignore
		ingredients[key].forEach((elem: IIngredientType) => {
			if (elem._id === id) {
				targetIngredient = elem;
			}
		});
	});

	return targetIngredient;
};

/**
 * Возвращает текст статуса для превью заказа
 * 
 * @param {string} status - статус заказа
 * @returns {string}
 */
export const getStatusOrderName = (status: string): string => {
	switch (status) {
		case 'done':
			return 'Выполнен';
		case 'pending':
			return 'Готовится';
		case 'created':
			return 'Создан';
		default:
			return '';
	};
};

/**
 * Возвращает массив ингредиентов бургера
 * 
 * @param {IResultIngredientsData} ingredients - объект ингредиентов с группировкой по катигориям
 * @param {Array} ingredientIds - массив id ингредиентов бургера
 * @returns {Array}
 */
export const getBurgerIngredientsData = (ingredients: IResultIngredientsData | null, ingredientIds: Array<string>): Array<IIngredientType> => {
	let result: Array<IIngredientType> = [];
	if (ingredients !== null) {
		ingredientIds.forEach(id => {
			const ingredient = getIngredientById(ingredients, id);
			if (ingredient !== null) {
				result.push(ingredient);
			}
		});
	}

	return result;
};

/**
 * Возвращает стоимость бургера из заказа
 * 
 * @param {Array} ingredientsData - массив ингредиентов бургера
 * @returns {number}
 */
export const calculateBurgerPrice = (ingredientsData: Array<IIngredientType>): number => {
	const result = ingredientsData.reduce((acc, elem) => {
		return acc + elem.price;
	}, 0);

	return result;
};
