import styles from './ingredient-icon.module.css';

interface IIngredientIconProps {
	residue?: number,
}

const IngredientIcon = ({ residue }: IIngredientIconProps): JSX.Element => {
	return (
		<div className={styles.icon}>
			<img className={styles.img} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="Ингредиент" />
			{residue && (
				<>
					<div className={styles.blur}></div>
					<span className={styles.counter}>+{residue}</span>
				</>
			)}
		</div>
	);
};

export default IngredientIcon;
