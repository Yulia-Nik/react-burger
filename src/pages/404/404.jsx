import image from '../../images/cat-404.png';

import styles from './404.module.css';

const NonExistentPage = () => (
	<section className={styles.content}>
		<h1 className={styles.title}>Страница не существует...</h1>
		<img src={image} alt="Страница не существует" className={styles.image} />
	</section>
);

export default NonExistentPage;
