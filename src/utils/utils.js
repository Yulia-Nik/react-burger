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
 * Преобразует массив ингредиентов в объект с группировкой компонентов бургера: булка и начинка
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
