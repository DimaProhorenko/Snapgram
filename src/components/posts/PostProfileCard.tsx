import { formatDate } from '@/lib/utils';
import { ProfileCard } from '../profile';

type PostProfileCardProps = {
	profileImage: string;
	profileLink: string;
	name: string;
	creationDate: string;
	location: string;
};

const PostProfileCard = ({
	profileImage,
	profileLink,
	name,
	creationDate,
	location,
}: PostProfileCardProps) => {
	return (
		<ProfileCard>
			<ProfileCard.Image
				profileImageUrl={profileImage}
				alt={`Go to ${name} profile`}
				to={profileLink}
				width={32}
				height={32}
			/>
			<ProfileCard.Content>
				<ProfileCard.Name to={profileLink}>{name}</ProfileCard.Name>
				<div className='flex gap-3'>
					<p className='text-xs text-light-3'>
						{formatDate(creationDate)}
					</p>
					<p className='text-xs text-light-3'>{location}</p>
				</div>
			</ProfileCard.Content>
		</ProfileCard>
	);
};
export default PostProfileCard;
