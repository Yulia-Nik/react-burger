import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IBurgerIngredientType } from '../../utils/types';
import { DELETE_BURGER_INGREDIENT } from '../../services/burger-ingredients/actions';
import { useDispatch } from '../../services/store';

import styles from './constructor-part.module.css';

interface IConstructorPartProps {
	ingredient: IBurgerIngredientType;
	type?: 'top' | 'bottom';
	isLocked?: boolean;
}

const ConstructorPart = ({ingredient, type, isLocked}: IConstructorPartProps): JSX.Element => {
	const dispatch = useDispatch();

	const handleDelete = (): void => {
		//@ts-ignore
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

export default ConstructorPart;
