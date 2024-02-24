import { useMutation } from '@tanstack/react-query';

import { INewPost, INewUser } from '@/types';
import {
	createNewUser,
	createPost,
	logoutAccount,
	signInAccount,
} from '../appwrite/api';

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

export const useCreatePost = () => {
	return useMutation({
		mutationFn: (post: INewPost) => createPost(post),
	});
};
