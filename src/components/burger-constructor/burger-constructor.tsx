import { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorPart from '../constructor-part/constructor-part';
import ConstructorPartEmpty from '../constructor-part/constructor-part-empty';
import FillingIngredients from '../filling-ingredients/filling-ingredients';
import Price from '../price/price';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import Loader from '../loader/loader';
import { ADD_BUN, DELETE_ALL_BURGER_INGREADIENTS, addFillingIngridient } from '../../services/burger-ingredients/actions';
import { createOrder, CLEAR_ORDER_INFO } from '../../services/order/actions';
import { getBurgerPrice, getOrderDataForRequest } from '../../utils/data-utils';

import styles from './burger-constructor.module.css';
import { useSelector, useDispatch } from '../../services/store';

interface IBurgerConstructorProps {
	extraClass?: string;
}

interface IDragObject {
	id: string;
	type: 'bun' | 'main' | 'sauce';
}

interface IUpperDropCollectedProps {
	isHoverUp: boolean;
}

interface ILowerIDropCollectedProps {
	isHoverLow: boolean;
}

interface IFillingDropCollectedProps {
	isHoverFilling: boolean;
}

const BurgerConstructor = ({extraClass}: IBurgerConstructorProps): JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		burgerIngredients,
		ingredients,
		order,
		isLoading,
		user,
	} = useSelector(store => ({
		burgerIngredients: store.burgerIngredients.burgerIngredients,
		ingredients: store.ingredients.ingredients,
		order: store.order.order,
		isLoading: store.order.isLoading,
		user: store.auth.user,
	}));

	const burgerPrice = useMemo<number>(() => {
		//@ts-ignore
		return getBurgerPrice(burgerIngredients);
	}, [burgerIngredients]);

	const isActiveBtn = useMemo<boolean>(() => {
		return burgerIngredients.bun && burgerIngredients.filling.length;
	}, [burgerIngredients]);

	const [{ isHoverUp }, upperDropRef] = useDrop<IDragObject, unknown, IUpperDropCollectedProps>({
		accept: 'bun',
		collect: monitor => ({
			isHoverUp: monitor.isOver(),
		}),
		drop(item) {
			dispatch({
				type: ADD_BUN,
				// @ts-ignore
				payload: ingredients.bun.filter(el => el._id === item.id)[0],
			});
		},
	});

	const [{ isHoverLow }, lowerDropRef] = useDrop<IDragObject, unknown, ILowerIDropCollectedProps>({
		accept: 'bun',
		collect: monitor => ({
			isHoverLow: monitor.isOver(),
		}),
		drop(item) {
			dispatch({
				type: ADD_BUN,
				//@ts-ignore
				payload: ingredients.bun.filter(el => el._id === item.id)[0],
			});
		},
	});

	const [{ isHoverFilling }, fillingDropRef] = useDrop<IDragObject, unknown, IFillingDropCollectedProps>({
		accept: 'filling',
		collect: monitor => ({
			isHoverFilling: monitor.isOver(),
		}),
		drop(item) {
			dispatch(
				// @ts-ignore
				addFillingIngridient(ingredients[item.type].filter(el => el._id === item.id)[0])
			);
		},
	});

	const isHoverBun = useMemo<boolean>(() => isHoverLow || isHoverUp, [isHoverUp, isHoverLow]);

	const handleCreateOrder = (): void => {
		if (user) {
			//@ts-ignore
			const ingredientIds = getOrderDataForRequest(burgerIngredients);
			dispatch(createOrder(ingredientIds));
		} else {
			navigate('/login');
		}
	};

	const handleClearOrder = (): void => {
		dispatch({
			type: CLEAR_ORDER_INFO
		});

		dispatch({
			type: DELETE_ALL_BURGER_INGREADIENTS,
		});
	};

	const bunOutline = isHoverBun ? '4px dashed violet' : 'none';
	const fillingOutline = isHoverFilling ? '4px dashed violet' : 'none';

	return (
		<>
			<section className={extraClass}>
				<ul className={styles.group}>
					<li className={styles.firstIngredient} ref={upperDropRef}>
						{burgerIngredients.bun
							? (
								<ConstructorPart
									ingredient={{
										...burgerIngredients.bun,
										name: `${burgerIngredients.bun.name} (верх)`,
									}}
									type="top"
									isLocked={true}
								/>
							) : (<ConstructorPartEmpty outline={bunOutline}>Выберите булки</ConstructorPartEmpty>)
						}
					</li>

					<li className={`${styles.gropItem} mt-4 mb-4`} ref={fillingDropRef}>
						{burgerIngredients.filling.length
							? <FillingIngredients /> : <ConstructorPartEmpty outline={fillingOutline}>Выберите начинку</ConstructorPartEmpty>
						}
					</li>

					<li className={styles.lastIngredients} ref={lowerDropRef}>
						{burgerIngredients.bun
							? (
								<ConstructorPart
									ingredient={{
										...burgerIngredients.bun,
										name: `${burgerIngredients.bun.name} (низ)`,
									}}
									type="bottom"
									isLocked={true}
								/>
							) : (<ConstructorPartEmpty outline={bunOutline}>Выберите булки</ConstructorPartEmpty>)
						}
					</li>
				</ul>
				<div className={styles.footer}>
					<Price price={burgerPrice} type="big" />
					<Button htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={handleCreateOrder} disabled={!isActiveBtn}>
						Оформить заказ
					</Button>
				</div>
			</section>
			{order && order.number && (
				<Modal onClose={handleClearOrder}>
					<OrderDetails orderNumber={order.number} />
				</Modal>
			)}
			{isLoading && (
				<Loader />
			)}
		</>
	);
};

export default BurgerConstructor;
