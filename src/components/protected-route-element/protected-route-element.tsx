import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface IPageComponentProps {
	component: JSX.Element;
}

interface IProtectedRouteElementProps extends IPageComponentProps {
	onlyUnAuth: boolean;
}

const ProtectedRouteElement = ({component, onlyUnAuth = false}: IProtectedRouteElementProps): JSX.Element | null => {
	const { user, isAuthChecked } = useSelector(store => ({
		// @ts-ignore
		user: store.auth.user,
		// @ts-ignore
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

export const OnlyAuth = ({component}: IPageComponentProps): JSX.Element => (
	<ProtectedRouteElement onlyUnAuth={false} component={component} />
);

export const OnlyUnAuth = ({component}: IPageComponentProps): JSX.Element => (
	<ProtectedRouteElement onlyUnAuth={true} component={component} />
);
