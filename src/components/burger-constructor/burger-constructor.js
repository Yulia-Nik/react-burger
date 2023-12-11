import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorPart from '../constructor-part/constructor-part';
import ConstructorPartEmpty from '../constructor-part/constructor-part-empty';
import FillingIngredients from '../filling-ingredients/filling-ingredients';
import Price from '../price/price';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ADD_FILLING, ADD_BUN, DELETE_ALL_BURGER_INGREADIENTS } from '../../services/burger-ingredients/actions';
import { createOrder, CLEAR_ORDER_INFO } from '../../services/order/actions';
import { getBurgerPrice, getOrderDataForRequest } from '../../utils/data-utils';

import styles from './burger-constructor.module.css';

const BurgerConstructor = ({extraClass}) => {
	const dispatch = useDispatch();
	const {
		burgerIngredients,
		ingredients,
		order,
	} = useSelector(store => ({
		burgerIngredients: store.burgerIngredients.burgerIngredients,
		ingredients: store.ingredients.ingredients,
		order: store.order.order,
	}));

	const burgerPrice = useMemo(() => {
		return getBurgerPrice(burgerIngredients);
	}, [burgerIngredients]);

	const isActiveBtn = useMemo(() => {
		return burgerIngredients.bun && burgerIngredients.filling.length;
	}, [burgerIngredients]);

	const [{ isHoverUp }, upperDropRef] = useDrop({
		accept: 'bun',
		collect: monitor => ({
			isHoverUp: monitor.isOver(),
		}),
		drop(item) {
			dispatch({
				type: ADD_BUN,
				payload: ingredients.bun.filter(el => el._id === item.id)[0],
			});
		},
	});

	const [{ isHoverLow }, lowerDropRef] = useDrop({
		accept: 'bun',
		collect: monitor => ({
			isHoverLow: monitor.isOver(),
		}),
		drop(item) {
			dispatch({
				type: ADD_BUN,
				payload: ingredients.bun.filter(el => el._id === item.id)[0],
			});
		},
	});

	const [{ isHoverFilling }, fillingDropRef] = useDrop({
		accept: 'filling',
		collect: monitor => ({
			isHoverFilling: monitor.isOver(),
		}),
		drop(item) {
			dispatch({
				type: ADD_FILLING,
				payload: ingredients[item.type].filter(el => el._id === item.id)[0],
			});
		},
	});

	const isHoverBun = useMemo(() => isHoverLow || isHoverUp, [isHoverUp, isHoverLow]);

	const handleCreateOrder = () => {
		const ingredientIds = getOrderDataForRequest(burgerIngredients);
		dispatch(createOrder(ingredientIds));
	};

	const handleClearOrder = () => {
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
		</>
	);
};

BurgerConstructor.propTypes = {
	extraClass: PropTypes.string,
};

export default BurgerConstructor;
