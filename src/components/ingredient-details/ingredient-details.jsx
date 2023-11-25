import PropTypes from 'prop-types';

import styles from './ingredient-details.module.css';

const IngredientDetails = props => {
	return (
		<div className={styles.container}>
			<img alt={props.alt} src={props.image} />
			<div className={styles.name}>{props.name}</div>
			<div className={styles.energyValue}>
				<div className={styles.valueItem}>
					<div className={styles.unit}>Калории, ккал</div>
					<div className={styles.value}>{props.calories}</div>
				</div>
				<div className={styles.valueItem}>
					<div className={styles.unit}>Белки, г</div>
					<div className={styles.value}>{props.proteins}</div>
				</div>
				<div className={styles.valueItem}>
					<div className={styles.unit}>Жиры, г</div>
					<div className={styles.value}>{props.fat}</div>
				</div>
				<div className={styles.valueItem}>
					<div className={styles.unit}>Углеводы, г</div>
					<div className={styles.value}>{props.carbohydrates}</div>
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
