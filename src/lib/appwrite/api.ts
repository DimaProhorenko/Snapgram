import { ID, Query } from 'appwrite';

import { INewPost, INewUser } from '@/types';
import { account, appwriteConfig, databases, storage } from './config';
import { avatar } from './config';

export const createNewUser = async ({
	name,
	username,
	email,
	password,
}: INewUser) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			name
		);

		if (!newAccount) {
			throw new Error('Something went wrong');
		}

		const avatarUrl = avatar.getInitials(name);
		const newUser = await saveUserToDB({
			accountId: newAccount.$id,
			name,
			username,
			email,
			imageId: ID.unique(),
			imageUrl: avatarUrl,
		});
		return newUser;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const saveUserToDB = async (user: {
	accountId: string;
	name: string;
	username: string;
	email: string;
	imageId: string;
	imageUrl: URL;
}) => {
	try {
		const newUser = databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			user
		);
		return newUser;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const signInAccount = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	try {
		const session = account.createEmailSession(email, password);
		return session;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();

		if (!currentAccount) {
			throw new Error('Could not find the account');
		}

		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal('accountId', currentAccount.$id)]
		);

		if (!currentUser) {
			throw new Error('User not found');
		}
		return currentUser.documents[0];
	} catch (err) {
		console.log(err);
	}
};

export const logoutAccount = async () => {
	try {
		const session = await account.deleteSession('current');
		return session;
	} catch (err) {
		console.log(err);
	}
};

export const createPost = async ({
	userId,
	caption,
	file,
	location,
	tags,
}: INewPost) => {
	try {
		// Upload a file
		const imageFile = await uploadFile(file[0]);

		if (!imageFile) {
			throw new Error('Image was not uploaded');
		}
		// Get image url
		const imageFileUrl = await getFilePreview(imageFile.$id);

		if (!imageFileUrl) {
			await deleteFile(imageFile.$id);
			throw new Error('Image was not found');
		}

		// Convert tags to array
		const tagsArr = tags?.replace(/ /g, '')?.split(', ') || [];

		// Save post to DB
		const newPost = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.postsCollectionId,
			ID.unique(),
			{
				creator: userId,
				caption,
				location,
				tags: tagsArr,
				imageUrl: imageFileUrl,
				imageId: imageFile.$id,
			}
		);

		if (!newPost) {
			await deleteFile(imageFile.$id);
			throw new Error('Could not create the post');
		}

		return newPost;
	} catch (err) {
		console.log(err);
	}
};

export const uploadFile = async (file: File) => {
	try {
		const uploadedFile = await storage.createFile(
			appwriteConfig.storageId,
			ID.unique(),
			file
		);
		return uploadedFile;
	} catch (err) {
		console.log(err);
	}
};

export const getFilePreview = async (fileId: string) => {
	try {
		const fileUrl = await storage.getFilePreview(
			appwriteConfig.storageId,
			fileId
		);
		return fileUrl;
	} catch (err) {
		console.log(err);
	}
};

export const deleteFile = async (fileId: string) => {
	try {
		await storage.deleteFile(appwriteConfig.storageId, fileId);
		return { status: 'ok' };
	} catch (err) {
		console.log(err);
	}
};

// Query Posts
export const getRecentPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.postsCollectionId,
			[Query.orderDesc('$createdAt'), Query.limit(20)]
		);
		if (!posts) {
			throw new Error('Could not load posts');
		}

		return posts;
	} catch (err) {
		console.log(err);
	}
};
