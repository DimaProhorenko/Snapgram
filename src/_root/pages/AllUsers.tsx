import { AllUsersList } from '@/components/AllUsers';
import { Loader } from '@/components/shared';
import { useGetAllUsers } from '@/lib/react-query/queriesAndMutations';

const AllUsers = () => {
	const { data, isFetching } = useGetAllUsers();
	const users = data?.documents;

	return (
		<div className='all_users-container'>
			<h2 className='h3-bold md:h2-bold w-full'>All Users</h2>
			{isFetching && <Loader />}
			{!isFetching && users && <AllUsersList users={users} />}
		</div>
	);
};
export default AllUsers;
