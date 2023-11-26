import PropTypes from 'prop-types';

import styles from './ingredient-details.module.css';

const IngredientDetails = ({ingredient}) => {
	return (
		<div className={styles.container}>
			<img alt={ingredient.alt} src={ingredient.image} />
			<div className={styles.name}>{ingredient.name}</div>
			<div className={styles.energyValue}>
				<div className={styles.valueItem}>
					<div className={styles.unit}>Калории, ккал</div>
					<div className={styles.value}>{ingredient.calories}</div>
				</div>
				<div className={styles.valueItem}>
					<div className={styles.unit}>Белки, г</div>
					<div className={styles.value}>{ingredient.proteins}</div>
				</div>
				<div className={styles.valueItem}>
					<div className={styles.unit}>Жиры, г</div>
					<div className={styles.value}>{ingredient.fat}</div>
				</div>
				<div className={styles.valueItem}>
					<div className={styles.unit}>Углеводы, г</div>
					<div className={styles.value}>{ingredient.carbohydrates}</div>
				</div>
			</div>
		</div>
	);
};

IngredientDetails.propTypes = {
	alt: PropTypes.string,
	image: PropTypes.string,
	name: PropTypes.string,
	calories: PropTypes.number,
	fat: PropTypes.number,
	proteins: PropTypes.number,
	carbohydrates: PropTypes.number,
}

export default IngredientDetails;
