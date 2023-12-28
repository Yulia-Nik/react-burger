/**
 * Преобразует массив ингредиентов в объект с группировкой по катигориям ингредиентов
 * 
 * @param {Array} data - исходный массив ингредиентов
 * @returns {Object}
 */
export const formatIngredientsData = data => {
	const result = data.reduce(
		(acc, elem) => {
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
					[elem.type]: [
						...acc[elem.type],
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
export const getIngredientCount = (type, id, burgerIngredients) => {
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
export const getBurgerPrice = burgerIngredients => {
	let price = burgerIngredients.bun ? 2 * burgerIngredients.bun.price : 0;
	burgerIngredients.filling.forEach(ingredient => {
		price += ingredient.price;
	});

	return price;
};

/**
 * Возвращает массив ингредиентов для отправки запроса создания заказа
 * 
 * @param {Object} data - объект ингредиентов бургера
 * @returns {Array}
 */
export const getOrderDataForRequest = data => {
	const result = data.bun ? [data.bun._id] : [];
	data.filling.forEach(el => {
		result.push(el._id);
	});
	result.push(data.bun._id);

	return result;
};

export const getIngredientById = (ingredients, id) => {
	let targetIngredient = null;
	Object.keys(ingredients).forEach(key => {
		ingredients[key].forEach(elem => {
			if (elem._id === id) {
				targetIngredient = elem;
			}
		});
	});

	return targetIngredient;
};
