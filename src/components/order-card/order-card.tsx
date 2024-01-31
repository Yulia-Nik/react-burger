import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { getIngredients } from '../../services/ingredients/actions';
import { useDispatch, useSelector } from '../../services/store';
import { getStatusOrderName, getBurgerIngredientsData } from '../../utils/data-utils';
import { IIngredientType, IOrderResultType } from '../../utils/types';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import Price from '../price/price';

import styles from './order-card.module.css';

type TOrderCardProps = Omit<IOrderResultType, 'updatedAt' | '_id'>;

const MAX_ICON_COUNT = 6;
const SUBTRAHEND_VALUE = 5;

const OrderCard = (props: TOrderCardProps): JSX.Element => {
	const dispatch = useDispatch();
	const { ingredients } = useSelector(store => store.ingredients);
	const [orderIngredients, setOrderIngredients] = useState<Array<IIngredientType>>([]);
	const [residue, setResidue] = useState<number>(0);
	const [images, setImages] = useState<Array<string>>([]);
	const [price, setPrice] = useState<number>(0);

	const calculateBurgerPrice = (): number => {
		const result = orderIngredients.reduce((acc, elem) => {
			return acc + elem.price;
		}, 0);

		return result;
	};

	useEffect(() => {
		if (ingredients !== null) {
			const burgerIngredientsData = getBurgerIngredientsData(ingredients, props.ingredients);
			const burgerPrice = calculateBurgerPrice();
			setOrderIngredients(burgerIngredientsData);
			setPrice(burgerPrice);
		} else {
			// dispatch(getIngredients());
		}
	});

	useEffect(() => {
		if (orderIngredients.length > MAX_ICON_COUNT) {
			setResidue(orderIngredients.length - SUBTRAHEND_VALUE);
			setImages(orderIngredients.slice(0, MAX_ICON_COUNT).reverse().map(item => item.image_mobile));
			console.log(images);
		} else if (orderIngredients.length) {
			setImages(orderIngredients.reverse().map(item => item.image_mobile));
			console.log(images);
		}
	}, [orderIngredients]);

	return (
		<div className={styles.card}>
			<div className={styles.row}>
				<div className="text text_type_digits-default">#{props.number}</div>
				<div className="text text_type_main-default text_color_inactive">
					<FormattedDate date={new Date(props.createdAt)} />
				</div>
			</div>
			<div>
				<div className="text text_type_main-medium">{props.name}</div>
				{props?.status && (
					<div className={`text text_type_main-default mt-2${props.status === 'done' ? ` ${styles.statusDone}` : ''}`}>{getStatusOrderName(props.status)}</div>
				)}
			</div>
			<div className={styles.row}>
				<ul className={styles.ingredients}>
					{images.map((item, index) => (
						<li className={styles.item}>
							<IngredientIcon src={item} residue={residue && index === 0 ? residue : 0} />
						</li>
					))}
				</ul>
				<Price price={price} />
			</div>
		</div>
	);
};

export default OrderCard;
