import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorPart from '../constructor-part/constructor-part';
import ConstructorPartEmpty from '../constructor-part/constructor-part-empty';
import Price from '../price/price';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import useModal from '../../hooks/useModal';
import { ADD_FILLING, ADD_BUN } from '../../services/burger-ingredients/actions';

import styles from './burger-constructor.module.css';

const BurgerConstructor = ({extraClass}) => {
	const dispatch = useDispatch();
	const { burgerIngredients, ingredients } = useSelector(store => ({
		burgerIngredients: store.burgerIngredients.burgerIngredients,
		ingredients: store.ingredients.ingredients,
	}));

	const [{ isHover }, dropRef] = useDrop({
		accept: 'bun',
		collect: monitor => ({
			isHover: monitor.isOver(),
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
			isHover: monitor.isOver(),
		}),
		drop(item) {
			dispatch({
				type: ADD_FILLING,
				payload: ingredients[item.type].filter(el => el._id === item.id)[0],
			});
		},
	});

	const bunOutline = isHover ? '4px dashed violet' : 'none';
	const fillingOutline = isHoverFilling ? '4px dashed violet' : 'none';

	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<>
			<section className={extraClass}>
				<ul className={styles.group}>
					<li className={styles.firstIngredient} ref={dropRef}>
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
							? (
								<ul className={styles.scrollList}>
									{burgerIngredients.filling.map((ingredient, index) => {
										return (
											<li className={index < burgerIngredients.filling.length - 1 ? 'mb-4' : ''} key={index}>
												<ConstructorPart ingredient={ingredient} additionalClass="mb-4" />
											</li>
										);
									})}
								</ul>
							) : (<ConstructorPartEmpty outline={fillingOutline}>Выберите начинку</ConstructorPartEmpty>)
						}
					</li>

					<li className={styles.lastIngredients}>
						{burgerIngredients.bun
							? (
								<ConstructorPart
									ingredient={{
										...burgerIngredients.bun,
										name: `${burgerIngredients.bun.name} (низ)`,
									}}
									type="top"
									isLocked={true}
								/>
							) : (<ConstructorPartEmpty outline={bunOutline}>Выберите булки</ConstructorPartEmpty>)
						}
					</li>
				</ul>
				<div className={styles.footer}>
					<Price price={600} type="big" /> {/** TODO: Далее заменить на props */}
					<Button htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={openModal}>
						Оформить заказ
					</Button>
				</div>
			</section>
			{isModalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</>
	);
};

BurgerConstructor.propTypes = {
	extraClass: PropTypes.string,
};

export default BurgerConstructor;
