import { useEffect } from 'react';
import OrderCard from '../../components/order-card/order-card';
import ProfileSidebar from '../../components/profile-sidebar/profile-sidebar';
import { useDispatch, useSelector } from '../../services/store';
import {
	connect as OrderFeedConnect,
	disconnect as OrderFeedDisconnect,
} from '../../services/order-feed/actions';
import { WebsocketStatus } from '../../types/socket';

import styles from './orders.module.css';

const Orders = (): JSX.Element => {
	

	return (
		<>
			<ProfileSidebar />
			<section className={styles.list}>

			</section>
		</>
	);
};

export default Orders;
