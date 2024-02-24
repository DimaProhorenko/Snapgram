import { Link } from 'react-router-dom';

type ProfileCardProps = {
	children: React.ReactNode;
};

type ProfileImageProps = {
	profileImageUrl: string;
	alt: string;
	to: string;
	className?: string;
	width?: number;
	height?: number;
};

type ProfileCardContentProps = {
	children: React.ReactNode;
	className?: string;
};

type ProfileCardNameProps = {
	children: React.ReactNode;
	to: string;
	className?: string;
};

type ProfileCardUsernameProps = {
	children: React.ReactNode;
	to: string;
	className?: string;
};

const ProfileCard = ({ children }: ProfileCardProps) => {
	return <div className='flex gap-3 items-center'>{children}</div>;
};

ProfileCard.Image = function ProfileCardImage({
	profileImageUrl,
	alt,
	to,
	className = '',
	width = 28,
	height = 28,
}: ProfileImageProps) {
	return (
		<Link to={to} className='flex-shrink-0 block'>
			<img
				src={profileImageUrl || 'assets/images/profile-placeholder.svg'}
				alt={alt}
				className={`rounded-full ${className}`}
				width={width}
				height={height}
			/>
		</Link>
	);
};

ProfileCard.Content = function ProfileCardContent({
	children,
	className = '',
}: ProfileCardContentProps) {
	return <div className={className}>{children}</div>;
};

ProfileCard.Name = function ProfileCardName({
	children,
	to,
	className = '',
}: ProfileCardNameProps) {
	return (
		<Link to={to}>
			<h4 className={`font-bold text-base md:text-lg ${className}`}>
				{children}
			</h4>
		</Link>
	);
};

ProfileCard.Username = function ProfileCardUsername({
	children,
	to,
	className = '',
}: ProfileCardUsernameProps) {
	return (
		<Link to={to}>
			<p className={`text-light-3 text-xs md:text-sm ${className}`}>
				@{children}
			</p>
		</Link>
	);
};

export default ProfileCard;
