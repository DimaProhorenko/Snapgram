import { ID } from 'appwrite';

import { INewUser } from '@/types';
import { account } from './config';

export const createNewUser = async ({ name, email, password }: INewUser) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			name
		);
		return newAccount;
	} catch (err) {
		console.log(err);
		return err;
	}
};
