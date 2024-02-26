import { Models } from 'appwrite';
import AllUsersItem from './AllUsersItem';

type AllUsersListProps = {
	users: Models.Document[];
};

const AllUsersList = ({ users }: AllUsersListProps) => {
	return (
		<ul className='flex gap-4 flex-wrap justify-center lg:justify-start'>
			{users.map((user: Models.Document) => (
				<AllUsersItem key={user.$id} user={user} />
			))}
		</ul>
	);
};
export default AllUsersList;
