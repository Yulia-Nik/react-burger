import PropTypes from 'prop-types';
import { useState } from 'react';
import Tabs from '../tabs/tabs';
import IngredientsGroup from '../ingredients-group/ingredients-group';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

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
	const [currentIngredient, setCurrentIngredient] = useState(null);

	const handleModalClose = () => {
		setCurrentIngredient(null);
	};

	return (
		<section className="content-column">
			<Tabs />
			<div className={styles.ingredientsContainer}>
				{props.ingredients.bun.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('bun')}
						data={props.ingredients.bun}
						onSelect={setCurrentIngredient}
					/>
				)}
				{props.ingredients.main.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('main')}
						data={props.ingredients.main}
						onSelect={setCurrentIngredient}
					/>
				)}
				{props.ingredients.sauce.length && (
					<IngredientsGroup
						title={getIngredientsGroupTitle('sauce')}
						data={props.ingredients.sauce}
						onSelect={setCurrentIngredient}
					/>
				)}
			</div>
			{currentIngredient && (
				<Modal onClose={handleModalClose}>
					<IngredientDetails ingredient={currentIngredient} />
				</Modal>
			)}
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.object,
};

export default BurgerIngredients;
