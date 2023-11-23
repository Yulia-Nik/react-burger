import { DragIcon, LockIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../components/price/price';

import styles from './constructor-part.module.css';

const ConstructorPart = props => {
	const extremeClass = props.type !== 'bun' ? '' : props?.index ? styles.lastIngredient : styles.firstIngredient;

	return (
		<div className={`${styles.wrap} ${props.additionalClass ? props.additionalClass : ''}`}>
			{props.type !== 'bun' && (
				<DragIcon type="primary" />
			)}
			<div className={`${styles.ingredient} ${extremeClass}`}>
				<figure className={styles.flex}>
					<img alt={props.alt} src={props.image} className={styles.img} />
					<figcaption className={styles.name}>{props.name}</figcaption>
				</figure>
				<div className={styles.flex}>
					<Price price={props.price} />
					{props.type === 'bun' ? (
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

export default ConstructorPart;
