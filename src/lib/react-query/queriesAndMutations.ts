import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';

import { INewPost, INewUser, IUpdatePost } from '@/types';
import {
	createNewUser,
	createPost,
	deletePost,
	deleteSavedPost,
	getAllUsers,
	getCurrentUser,
	getInfinitePosts,
	getPostById,
	getPostsByUserId,
	getRecentPosts,
	getSavedPosts,
	getUserById,
	getUserLikedPosts,
	likePost,
	logoutAccount,
	savePost,
	searchPostByCaption,
	signInAccount,
	updatePost,
} from '../appwrite/api';
import { QUERY_KEYS } from './queryKeys';

// AUTH
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

// USERS
export const useGetCurrentUser = () => {
	return useQuery({
		queryFn: getCurrentUser,
		queryKey: [QUERY_KEYS.GET_CURRENT_USER],
	});
};

export const useGetAllUsers = () => {
	return useQuery({
		queryKey: [],
		queryFn: getAllUsers,
	});
};

export const useGetUserById = (id: string) => {
	return useQuery({
		queryKey: [],
		queryFn: () => getUserById(id),
	});
};

// POSTS
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
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
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
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
			});
		},
	});
};

export const useGetPostById = (postId: string) => {
	return useQuery({
		queryFn: () => getPostById(postId),
		queryKey: [
			QUERY_KEYS.GET_POSTS,
			QUERY_KEYS.GET_POST_BY_ID,
			QUERY_KEYS.GET_RECENT_POSTS,
			postId,
		],
		enabled: !!postId,
	});
};

export const useUpdatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (post: IUpdatePost) => updatePost(post),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_BY_ID],
			});
		},
	});
};

export const useDeletePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			postId,
			imageId,
		}: {
			postId: string;
			imageId: string;
		}) => deletePost(postId, imageId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_BY_ID],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
		},
	});
};

export const useGetInfinitePosts = () => {
	return useInfiniteQuery({
		queryKey: [QUERY_KEYS.GET_POSTS],
		queryFn: getInfinitePosts,
		getNextPageParam: (lastPage) => {
			// If there's no data, there are no more pages.
			if (lastPage && lastPage.documents.length === 0) {
				return null;
			}

			// Use the $id of the last document as the cursor.
			const lastId =
				lastPage?.documents[lastPage?.documents?.length - 1].$id;
			return lastId;
		},
		initialPageParam: '',
	});
};

export const useSearchPosts = (searchTerm: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_POSTS, searchTerm],
		queryFn: () => searchPostByCaption(searchTerm),
		enabled: !!searchTerm,
	});
};

export const useGetSavedPosts = (userId: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
		queryFn: () => getSavedPosts(userId),
	});
};

export const useGetPostsByUserId = (userId: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_POSTS, QUERY_KEYS.GET_RECENT_POSTS, userId],
		queryFn: () => getPostsByUserId(userId),
	});
};

export const useGetUserLikedPosts = (userId: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_POSTS, QUERY_KEYS.GET_RECENT_POSTS, userId],
		queryFn: () => getUserLikedPosts(userId),
	});
};
