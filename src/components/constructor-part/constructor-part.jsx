import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types';
import { DELETE_BURGER_INGREDIENT } from '../../services/burger-ingredients/actions';

import styles from './constructor-part.module.css';

const ConstructorPart = ({ingredient, type, isLocked}) => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch({
			type: DELETE_BURGER_INGREDIENT,
			payload: ingredient,
		});
	};

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
				handleClose={handleDelete}
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
