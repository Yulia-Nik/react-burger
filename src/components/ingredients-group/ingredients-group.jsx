import PropTypes from 'prop-types';
import IngredientCard from '../ingredient-card/ingredient-card'

import styles from './ingredients-group.module.css';

const IngredientsGroup = props => {
	return (
		<div className="mb-2">
			<h2>{props.title}</h2>
			<ul className={styles.list}>
				{props.data.map(ingredient =>
					<li className={styles.ingredientItem} key={ingredient._id}>
						<IngredientCard ingredient={ingredient} count={1} onSelect={props.onSelect} />
					</li>
				)}
			</ul>
		</div>
	)
};

IngredientsGroup.propTypes = {
	title: PropTypes.string,
	data: PropTypes.array,
	onSelect: PropTypes.func,
};

export default IngredientsGroup;