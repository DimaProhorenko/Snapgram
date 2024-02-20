import { useMutation } from '@tanstack/react-query';

import { INewUser } from '@/types';
import { createNewUser, logoutAccount, signInAccount } from '../appwrite/api';

export const useCreateUserAccountMutation = () => {
	return useMutation({
		mutationFn: (user: INewUser) => createNewUser(user),
	});
};

export const useSignInAccountMutation = () => {
	return useMutation({
		mutationFn: (user: { email: string; password: string }) =>
			signInAccount(user),
	});
};

export const useLogoutMutation = () => {
	return useMutation({
		mutationFn: logoutAccount,
	});
};
