import clsx from 'clsx';
import { Link } from 'react-router-dom';

type ProfileCardProps = {
	children: React.ReactNode;
	className?: string;
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
	size?: 'default' | 'sm';
};

type ProfileCardUsernameProps = {
	children: React.ReactNode;
	to: string;
	className?: string;
};

const ProfileCard = ({ children, className = '' }: ProfileCardProps) => {
	return (
		<div className={`flex gap-3 items-center ${className}`}>{children}</div>
	);
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
	size = 'default',
	className = '',
}: ProfileCardNameProps) {
	const classes = clsx({
		'text-sm md:text-xs font-medium': size === 'sm',
		'text-base md:text-lg font-bold': size === 'default',
		[className]: className,
	});
	return (
		<Link to={to}>
			<h4 className={classes}>{children}</h4>
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
