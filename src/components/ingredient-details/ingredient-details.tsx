import { IIngredientType } from '../../utils/types';

import styles from './ingredient-details.module.css';

interface IIngredientDetailsProps {
	ingredient: IIngredientType
}

const IngredientDetails = ({ingredient}: IIngredientDetailsProps): JSX.Element => {
	return (
		<div className={styles.container}>
			<img alt={ingredient.name} src={ingredient.image_large} />
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

export default IngredientDetails;
