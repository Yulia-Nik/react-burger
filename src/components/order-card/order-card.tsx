import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useSelector } from '../../services/store';
import { getStatusOrderName, getBurgerIngredientsData, calculateBurgerPrice } from '../../utils/data-utils';
import { IIngredientType, IOrderResultType } from '../../utils/types';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import Price from '../price/price';

import styles from './order-card.module.css';

type TOrderCardProps = Omit<IOrderResultType, 'updatedAt' | '_id'>;

const MAX_ICON_COUNT = 6;
const SUBTRAHEND_VALUE = 5;

const OrderCard = (props: TOrderCardProps): JSX.Element => {
	const { ingredients } = useSelector(store => store.ingredients);
	const [orderIngredients, setOrderIngredients] = useState<Array<IIngredientType>>([]);
	const [residue, setResidue] = useState<number>(0);
	const [images, setImages] = useState<Array<string>>([]);
	const [price, setPrice] = useState<number>(0);

	useEffect(() => {
		const burgerIngredientsData = getBurgerIngredientsData(ingredients, props.ingredients);
		setOrderIngredients(burgerIngredientsData);
	}, []);

	useEffect(() => {
		const burgerPrice = calculateBurgerPrice(orderIngredients);
		setPrice(burgerPrice);

		if (orderIngredients.length > MAX_ICON_COUNT) {
			setResidue(orderIngredients.length - SUBTRAHEND_VALUE);
			setImages(orderIngredients.slice(0, MAX_ICON_COUNT).reverse().map(item => item.image_mobile));
		} else if (orderIngredients.length) {
			setImages(orderIngredients.reverse().map(item => item.image_mobile));
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
					<div className={`text text_type_main-default mt-2${props.status === 'done' ? ` ${styles.statusDone}` : ''}`}>
						{getStatusOrderName(props.status)}
					</div>
				)}
			</div>
			<div className={styles.row}>
				<ul className={styles.ingredients}>
					{images.map((item, index) => (
						<li className={styles.item} key={index}>
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
