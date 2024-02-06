import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getIngredients } from '../../services/ingredients/actions';
import { calculateBurgerPrice, getBurgerIngredientsData, getStatusOrderName } from '../../utils/data-utils';
import { IOrderResultType, IIngredientType } from '../../utils/types';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import OrderStatus from '../order-status/order-status';
import Price from '../price/price';

import styles from './order-info.module.css';

type TIngredientGroup = IIngredientType & {
	count: number
};

interface IOrderInfoProps {
	data: IOrderResultType;
}

const OrderInfo = ({ data }: IOrderInfoProps): JSX.Element => {
	const dispatch = useDispatch();
	const { ingredients } = useSelector(store => store.ingredients);
	const [ingredientsGroups, setIngredientsGroups] = useState<Array<TIngredientGroup>>([]);
	const [price, setPrice] = useState<number>(0);

	useEffect(() => {
		if (!ingredients) {
			//@ts-ignore
			dispatch(getIngredients());
		}
	}, []);

	useEffect(() => {
		const ingredientsData = getBurgerIngredientsData(ingredients, data.ingredients);

		const burgerPrice = calculateBurgerPrice(ingredientsData);
		setPrice(burgerPrice);

		//@ts-ignore
		const result = ingredientsData.reduce((acc, item) => {
			//@ts-ignore
			if (acc.some(el => el._id === item._id)) {
				return acc;
			} else {
				const count: number = ingredientsData.filter(el => el._id === item._id).length;

				return [
					...acc,
					{
						...item,
						count,
					},
				];
			}
		}, []);

		//@ts-ignore
		setIngredientsGroups(result);
	}, [ingredients]);

	// useEffect(() => {
	// 	debugger;
	// 	const burgerPrice = calculateBurgerPrice(ingredientsGroups);
	// 	setPrice(burgerPrice);
	// }, [ingredientsGroups]);

	return (
		<section className={styles.container}>
			<div>
				<div className="text text_type_main-medium">{data.name}</div>
				{data.status && (
					<div className={`text text_type_main-default mt-2${data.status === 'done' ? ` ${styles.statusDone}` : ''}`}>
						<OrderStatus status={data.status} />
					</div>
				)}
			</div>

			<div className="mt-15 mb-10">
				<div className="text text_type_main-medium mb-6">Состав:</div>
				<ul className={styles.list}>
					{ingredientsGroups.map((item, index) => (
						<li key={index} className={`${styles.item} ${styles.space} mb-4 mr-6`}>
							<div className={styles.item}>
								<IngredientIcon src={item.image_mobile} />
								<p className="text text_type_main-default ml-4">{item.name}</p>
							</div>

							<div className={styles.price}>
								<span className="text text_type_digits-default">{item.count}&nbsp;x&nbsp;</span>
								<Price price={item.price} />
							</div>
						</li>
					))}
				</ul>
			</div>

			<div className={styles.footer}>
				<div className="text text_type_main-default text_color_inactive">
					<FormattedDate date={new Date(data.createdAt)} />
				</div>
				<Price price={price} />
			</div>
		</section>
	);
};

export default OrderInfo;
