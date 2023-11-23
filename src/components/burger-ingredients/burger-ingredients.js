import PropTypes from 'prop-types';
import Tabs from '../tabs/tabs';
import IngredientsGroup from '../ingredients-group/ingredients-group';

import styles from './burger-ingredients.module.css';

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

const BurgerIngredients = props => {
	return (
		<section className="content-column">
			<Tabs />
			<div className={styles.ingredientsContainer}>
				{props.ingredients.bun.length && (
					<IngredientsGroup title={getIngredientsGroupTitle('bun')} data={props.ingredients.bun} />
				)}
				{props.ingredients.main.length && (
					<IngredientsGroup title={getIngredientsGroupTitle('main')} data={props.ingredients.main} />
				)}
				{props.ingredients.sauce.length && (
					<IngredientsGroup title={getIngredientsGroupTitle('sauce')} data={props.ingredients.sauce} />
				)}
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.object,
};

export default BurgerIngredients;
