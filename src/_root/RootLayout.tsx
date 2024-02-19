import { useUserContext } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const RootLayout = () => {
	const { isAuthenticated } = useUserContext();
	console.log('isAuthenticated => ', isAuthenticated);

	return <>{isAuthenticated ? <h1>ROOT</h1> : <Navigate to='/signup' />}</>;
};
export default RootLayout;
