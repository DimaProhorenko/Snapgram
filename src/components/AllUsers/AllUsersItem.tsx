import { Models } from 'appwrite';
import { Card, CardHeader } from '../ui/card';
import { ProfileCard } from '../profile';
import { PROFILE } from '@/constants/routes';

type AllUsersItemProps = {
	user: Models.Document;
};

const AllUsersItem = ({ user }: AllUsersItemProps) => {
	const pathToProfile = `${PROFILE}/${user.$id}`;
	return (
		<li className='w-full min-w-[228px] sm:w-[40%] md:w-full lg:w-[30%]'>
			<Card>
				<CardHeader>
					<ProfileCard>
						<ProfileCard.Image
							profileImageUrl={user.imageUrl}
							alt={user.name}
							to={pathToProfile}
						/>
						<ProfileCard.Content>
							<ProfileCard.Name to={pathToProfile} size='sm'>
								{user.name}
							</ProfileCard.Name>
							<ProfileCard.Username to={pathToProfile} size='sm'>
								{user.username}
							</ProfileCard.Username>
						</ProfileCard.Content>
					</ProfileCard>
				</CardHeader>
			</Card>
		</li>
	);
};
export default AllUsersItem;
