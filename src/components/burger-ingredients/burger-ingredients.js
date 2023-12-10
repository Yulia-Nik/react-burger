import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
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
	const { ingredients } = useSelector(store => ({
		ingredients: store.ingredients.ingredients
	}));

	return (
		<section className={props.extraClass}>
			<Tabs />
			<div className={styles.ingredientsContainer}>
				{ingredients.bun.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('bun')}
						data={ingredients.bun}
					/>
				)}
				{ingredients.main.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('main')}
						data={ingredients.main}
					/>
				)}
				{ingredients.sauce.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('sauce')}
						data={ingredients.sauce}
					/>
				)}
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.object,
	extraClass: PropTypes.string,
};

export default BurgerIngredients;
