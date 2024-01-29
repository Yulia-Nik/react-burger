import IngredientIcon from '../ingredient-icon/ingredient-icon';
import Price from '../price/price';

import styles from './order-card.module.css';

const OrderCard = (): JSX.Element => {
	return (
		<div className={styles.card}>
			<div className={styles.row}>
				<div className="text text_type_digits-default">#757748</div>
				<div className="text text_type_main-default text_color_inactive">Сегодня, 13:32</div>
			</div>
			<div>
				<div className="text text_type_main-medium">Название заказанного бургера</div>
				<div className={`text text_type_main-default mt-2${` ${styles.statusDone}`}`}>Статус</div>
			</div>
			<div className={styles.row}>
				<div className={styles.ingredients}>
					<IngredientIcon />
					<IngredientIcon residue={7} />
				</div>
				<Price price={999} />
			</div>
		</div>
	);
};

export default OrderCard;
