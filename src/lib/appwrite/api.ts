import { ID, Query } from 'appwrite';

import { INewUser } from '@/types';
import { account, appwriteConfig, databases } from './config';
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
