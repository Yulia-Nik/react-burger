import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRouteElement = ({component, onlyUnAuth = false}) => {
	const { user, isAuthChecked } = useSelector(store => ({
		user: store.auth.user,
		isAuthChecked: store.auth.isAuthChecked,
	}));
	const location = useLocation();

	if (!isAuthChecked) {
		return null;
	}

	if (onlyUnAuth && user) {
		const { from } = location.state || { from: { pathname: '/' } };
		return <Navigate to={from} />;
	} else if (!onlyUnAuth && !user) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return component;
};

ProtectedRouteElement.propTypes = {
	component: PropTypes.element,
	onlyUnAuth: PropTypes.bool,
};

export const OnlyAuth = ({component}) => (
	<ProtectedRouteElement onlyUnAuth={false} component={component} />
);

export const OnlyUnAuth = ({component}) => (
	<ProtectedRouteElement onlyUnAuth={true} component={component} />
);
