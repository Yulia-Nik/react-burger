import PropTypes from 'prop-types';
import { DragIcon, LockIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../components/price/price';
import { ingredientType } from '../../utils/types';

import styles from './constructor-part.module.css';

const ConstructorPart = ({ingredient, index}) => {
	const extremeClass = ingredient.type !== 'bun' ? '' : index > 0 ? styles.lastIngredient : styles.firstIngredient;

	return (
		<div className={`${styles.wrap} ${ingredient.additionalClass ? ingredient.additionalClass : ''}`}>
			{ingredient.type !== 'bun' && (
				<DragIcon type="primary" />
			)}
			<div className={`${styles.ingredient} ${extremeClass}`}>
				<figure className={styles.flex}>
					<img alt={ingredient.alt} src={ingredient.image} className={styles.img} />
					<figcaption className={styles.name}>{ingredient.name}</figcaption>
				</figure>
				<div className={styles.flex}>
					<Price price={ingredient.price} />
					{ingredient.type === 'bun' ? (
							<button className={styles.btn} disabled>
								<LockIcon type="secondary" />
							</button>
						) : (
							<button className={styles.btn}>
								<DeleteIcon type="primary" />
							</button>
						)
					}
				</div>
			</div>
		</div>
	);
};

ConstructorPart.propTypes = {
	ingredient: PropTypes.shape({...ingredientType}),
	index: PropTypes.number,
};

export default ConstructorPart;
