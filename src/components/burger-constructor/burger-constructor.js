import { useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorPart from '../constructor-part/constructor-part';
import Price from '../price/price';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

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

const otherIngredientsData = [
	{
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
	},
	{
		"_id":"60666c42cc7b410027a1a9b7",
		"name":"Соус Spicy-X",
		"type":"sauce",
		"proteins":30,
		"fat":20,
		"carbohydrates":40,
		"calories":30,
		"price":90,
		"image":"https://code.s3.yandex.net/react/code/sauce-02.png",
		"image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
		"image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
		"__v":0
	},
	{
		"_id":"60666c42cc7b410027a1a9b4",
		"name":"Мясо бессмертных моллюсков Protostomia",
		"type":"main",
		"proteins":433,
		"fat":244,
		"carbohydrates":33,
		"calories":420,
		"price":1337,
		"image":"https://code.s3.yandex.net/react/code/meat-02.png",
		"image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
		"image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
		"__v":0
	},
	{
		"_id":"60666c42cc7b410027a1a9bc",
		"name":"Плоды Фалленианского дерева",
		"type":"main",
		"proteins":20,
		"fat":5,
		"carbohydrates":55,
		"calories":77,
		"price":874,
		"image":"https://code.s3.yandex.net/react/code/sp_1.png",
		"image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
		"image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
		"__v":0
	},
	{
		"_id":"60666c42cc7b410027a1a9bb",
		"name":"Хрустящие минеральные кольца",
		"type":"main",
		"proteins":808,
		"fat":689,
		"carbohydrates":609,
		"calories":986,
		"price":300,
		"image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
		"image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
		"image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
		"__v":0
	},
];
// Временные статичные данные end

const BurgerConstructor = () => {
	const [showOrderDetails, setShowOrderDetails] = useState(false);

	const handleModalOpen = () => {
		setShowOrderDetails(true);
	};

	const handleModalClose = () => {
		setShowOrderDetails(false);
	};

	return (
		<>
			<section className="content-column">
				<ul className={styles.group}>
					<li className={styles.firstIngredient}>
						<ConstructorPart ingredient={bunData} />
					</li>
					<li className="mt-4 mb-4">
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
						<ConstructorPart ingredient={bunData} index={4} /> {/* index появится при переборе массива ингредиентов */}
					</li>
				</ul>
				<div className={styles.footer}>
					<Price price={600} type="big" /> {/** TODO: Далее заменить на props */}
					<Button htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={handleModalOpen}>
						Оформить заказ
					</Button>
				</div>
			</section>
			{showOrderDetails && (
				<Modal onClose={handleModalClose}>
					<OrderDetails />
				</Modal>
			)}
		</>
	);
}

export default BurgerConstructor;
