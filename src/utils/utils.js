/**
 * Преобразует массив ингредиентов в объкт с группировкой по катигориям ингредиентов
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
