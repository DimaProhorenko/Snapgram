import { Navigate } from 'react-router-dom';

const RootLayout = () => {
	const isAuthenticated = false;

	return <>{isAuthenticated ? <h1>ROOT</h1> : <Navigate to='/signup' />}</>;
};
export default RootLayout;
