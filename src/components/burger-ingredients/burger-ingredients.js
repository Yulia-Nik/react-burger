import PropTypes from 'prop-types';
import Tabs from '../tabs/tabs';
import IngredientsGroup from '../ingredients-group/ingredients-group';

import styles from './burger-ingredients.module.css';

import { ingredientsData } from '../../utils/data'; // Временный импорт

const getIngredientsGroupTitle = key => {
	switch(key) {
		case 'bun':
			return 'Булки';
			break;
		case 'main':
			return 'Начинки';
			break;
		case 'sauce':
			return 'Соусы';
			break;
		default:
			return '';
			break;
	};
};

const ingredients = ingredientsData.reduce((acc, elem) => {
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
}, {});
console.log(ingredients);

const BurgerIngredients = () => {
	return (
		<div>
			<Tabs />
			<div className={styles.ingredientsContainer}>
				{ingredients.bun.length && (
					<IngredientsGroup title={getIngredientsGroupTitle('bun')} data={ingredients.bun} />
				)}
				{ingredients.main.length && (
					<IngredientsGroup title={getIngredientsGroupTitle('main')} data={ingredients.main} />
				)}
				{ingredients.sauce.length && (
					<IngredientsGroup title={getIngredientsGroupTitle('sauce')} data={ingredients.sauce} />
				)}
			</div>
		</div>
	);
};

BurgerIngredients.propTypes = {

};

export default BurgerIngredients;
