import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { store } from '../../services/store';
import {
	Home,
	NonExistentPage,
	Login,
	Register,
	ForgotPassword,
	ResetPassword,
} from '../../pages';

import styles from './app.module.css';

function App() {

	return (
		<div className={styles.app}>
			<Provider store={store}>
				<AppHeader extraClass={styles.content} />

				<main className={`pt-10 pb-10 pl-6 pr-6 ${styles.content} ${styles.mainContent}`}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="*" element={<NonExistentPage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/reset-password" element={<ResetPassword />} />
					</Routes>
				</main>
			</Provider>
		</div>
	);
}

export default App;
