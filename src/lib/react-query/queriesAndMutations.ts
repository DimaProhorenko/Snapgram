import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { INewPost, INewUser } from '@/types';
import {
	createNewUser,
	createPost,
	deleteSavedPost,
	getCurrentUser,
	getRecentPosts,
	likePost,
	logoutAccount,
	savePost,
	signInAccount,
} from '../appwrite/api';
import { QUERY_KEYS } from './queryKeys';

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

export const useGetCurrentUser = () => {
	return useQuery({
		queryFn: getCurrentUser,
		queryKey: [QUERY_KEYS.GET_CURRENT_USER],
	});
};

export const useCreatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (post: INewPost) => createPost(post),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
		},
	});
};

export const useGetRecentPosts = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
		queryFn: getRecentPosts,
	});
};

export const useLikePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			postId,
			likesArr,
		}: {
			postId: string;
			likesArr: string[];
		}) => likePost(postId, likesArr),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};

export const useSavePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
			savePost(postId, userId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};

export const useDeleteSavedPost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (recordId: string) => deleteSavedPost(recordId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};
