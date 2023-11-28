import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorPart from '../constructor-part/constructor-part';
import Price from '../price/price';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import useModal from '../../hooks/useModal';

import { bunData, otherIngredientsData } from '../../utils/data';

import styles from './burger-constructor.module.css';

const BurgerConstructor = ({extraClass}) => {
	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<>
			<section className={extraClass}>
				<ul className={styles.group}>
					<li className={styles.firstIngredient}>
						<ConstructorPart
							ingredient={{
								...bunData,
								name: `${bunData.name} (верх)`,
							}}
							type="top"
							isLocked={true}
						/>
					</li>
					<li className={`${styles.gropItem} mt-4 mb-4`}>
						<ul className={styles.scrollList}>
							{otherIngredientsData.map((ingredient, index) => {
								return (
									<li className={index < otherIngredientsData.length - 1 ? 'mb-4' : ''} key={index}>
										<ConstructorPart ingredient={ingredient} additionalClass="mb-4" />
									</li>
								);
							})}
						</ul>
					</li>
					<li className={styles.lastIngredients}>
						<ConstructorPart
							ingredient={{
								...bunData,
								name: `${bunData.name} (низ)`
							}}
							type="bottom"
							isLocked={true}
						/>
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
