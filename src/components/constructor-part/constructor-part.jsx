import PropTypes from 'prop-types';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types';

import styles from './constructor-part.module.css';

const ConstructorPart = ({ingredient, type, isLocked}) => {
	return (
		<div className={`${styles.wrap} ${ingredient.additionalClass ? ingredient.additionalClass : ''}`}>
			{ingredient.type !== 'bun' && (
				<DragIcon type="primary" />
			)}
			<ConstructorElement
				type={type}
				isLocked={isLocked}
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image_mobile}
				extraClass={styles.element}
			/>
		</div>
	);
};

ConstructorPart.propTypes = {
	ingredient: ingredientType,
	type: PropTypes.string,
	isLocked: PropTypes.bool,
};

export default ConstructorPart;
