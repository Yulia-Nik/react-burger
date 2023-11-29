import loaderGif from '../../images/loader.gif';

import styles from './loader.module.css';

const Loader = () => {
	return (
		<div className={styles.wrap}>
			<img src={loaderGif} alt="Загрузка" className={styles.loader} />
		</div>
	);
};

export default Loader;
