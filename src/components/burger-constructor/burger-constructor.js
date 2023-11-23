import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorPart from '../constructor-part/constructor-part';
import Price from '../../components/price/price';


import styles from './burger-constructor.module.css';

// Временные статичные данные start
const bunData = {
	"_id":"60666c42cc7b410027a1a9b1",
   "name":"Краторная булка N-200i",
   "type":"bun",
   "proteins":80,
   "fat":24,
   "carbohydrates":53,
   "calories":420,
   "price":1255,
   "image":"https://code.s3.yandex.net/react/code/bun-02.png",
   "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
   "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
   "__v":0
};

const testData = {
	"_id":"60666c42cc7b410027a1a9b5",
	"name":"Говяжий метеорит (отбивная)",
	"type":"main",
	"proteins":800,
	"fat":800,
	"carbohydrates":300,
	"calories":2674,
	"price":3000,
	"image":"https://code.s3.yandex.net/react/code/meat-04.png",
	"image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
	"image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
	"__v":0
};
// Временные статичные данные end

const BurgerConstructor = () => {
	return (
		<section className="content-column">
			<ul className={styles.group}>
				<li className={styles.firstIngredient}>
					<ConstructorPart {...bunData} />
				</li>
				<li className="mt-4 mb-4">
					<ul className={styles.scrollList}>
						<li className={styles.ingredients}>
							<ConstructorPart {...testData} additionalClass="mb-4" />
						</li>
						<li className={styles.ingredients}>
							<ConstructorPart {...testData} additionalClass="mb-4" />
						</li>
						<li className={styles.ingredients}>
							<ConstructorPart {...testData} additionalClass="mb-4" />
						</li>
						<li className={styles.ingredients}>
							<ConstructorPart {...testData} />
						</li>
					</ul>
				</li>
				<li className={styles.lastIngredients}>
					<ConstructorPart {...bunData} index={4} /> {/* index появится при переборе массива ингредиентов */}
				</li>
			</ul>
			<div className={styles.footer}>
				<Price price={600} type="big" /> {/** TODO: Далее заменить на props */}
				<Button htmlType="button" type="primary" size="medium" extraClass="ml-10">Оформить заказ</Button>
			</div>
		</section>
	);
}

export default BurgerConstructor;
