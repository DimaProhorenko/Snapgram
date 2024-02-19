/* eslint-disable react-refresh/only-export-components */
import { HOME, SIGNIN, SIGNUP } from '@/constants/routes';
import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
	id: '',
	name: '',
	username: '',
	email: '',
	imageUrl: '',
	imageId: '',
	bio: '',
};

const INITIAL_STATE = {
	user: INITIAL_USER,
	isLoading: false,
	isAuthenticated: false,
	setUser: (): void => {},
	setIsAuthenticated: (): void => {},
	checkAuthUser: async () => false,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<IUser>(INITIAL_USER);
	const [isLoading, setIsLoading] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const navigate = useNavigate();

	const checkAuthUser = async () => {
		try {
			setIsLoading(true);
			const currentAccount = await getCurrentUser();

			if (currentAccount) {
				setUser({
					id: currentAccount.$id,
					name: currentAccount.name,
					username: currentAccount.username,
					email: currentAccount.email,
					imageUrl: currentAccount.imageUrl,
					bio: currentAccount.bio,
				});

				setIsAuthenticated(true);
				return true;
			}

			return false;
		} catch (err) {
			console.log(err);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const cookieFallback = localStorage.getItem('cookieFallback');
		console.log(cookieFallback);
		if (cookieFallback === '[]' || cookieFallback === null) {
			navigate(SIGNIN);
		} else {
			navigate(HOME);
		}
		checkAuthUser();
		console.log('Effect isAuthenticated', isAuthenticated);
	}, [isAuthenticated, navigate]);

	const value = {
		user,
		isLoading,
		isAuthenticated,
		setUser,
		setIsAuthenticated,
		checkAuthUser,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export const useUserContext = () => useContext(AuthContext);
