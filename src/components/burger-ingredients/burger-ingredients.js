import PropTypes from 'prop-types';
import Tabs from '../tabs/tabs';
import IngredientCard from '../ingredient-card/ingredient-card';

import image from '../../images/bun.png';

import styles from './burger-ingredients.module.css';

const data = {
	alt: 'Булка',
	src: image,
	cost: 20,
	name: 'Краторная булка N-200i',
};

const BurgerIngredients = () => {
	return (
		<div>
			<Tabs />
			<div className={styles.ingredientsContainer}>
				<div>
					<h2>Булки</h2>
					<div class={styles.ingredientsGroup}>
						<IngredientCard {...data} />
						<IngredientCard {...data} />
						<IngredientCard {...data} count={1} />
						<IngredientCard {...data} />
						<IngredientCard {...data} />
						<IngredientCard {...data} />
					</div>
				</div>
			</div>
		</div>
	);
};

BurgerIngredients.propTypes = {

};

export default BurgerIngredients;
