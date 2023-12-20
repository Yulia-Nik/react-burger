import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { store } from '../../services/store';
import Home from '../../pages/home/home';
import NonExistentPage from '../../pages/404/404';

import styles from './app.module.css';

function App() {

	return (
		<div className={styles.app}>
			<Provider store={store}>
				<AppHeader extraClass={styles.content} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="*" element={<NonExistentPage />} />
				</Routes>
			</Provider>
		</div>
	);
}

export default App;
