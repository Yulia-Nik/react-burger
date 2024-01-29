import OrderCard from '../../components/order-card/order-card';
import ProfileSidebar from '../../components/profile-sidebar/profile-sidebar';

import styles from './orders.module.css';

const Orders = (): JSX.Element => {
	return (
		<>
			<ProfileSidebar />
			<section className={styles.list}>
				<OrderCard />
			</section>
		</>
	);
};

export default Orders;
