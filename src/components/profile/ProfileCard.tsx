import clsx from 'clsx';
import { Link } from 'react-router-dom';

type ProfileCardProps = {
	children: React.ReactNode;
	col?: boolean;
	className?: string;
};

type ProfileImageProps = {
	profileImageUrl: string;
	alt: string;
	to?: string;
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
	to?: string;
	className?: string;
	size?: 'default' | 'sm' | 'lg' | 'xl';
};

type ProfileCardUsernameProps = {
	children: React.ReactNode;
	to?: string;
	className?: string;
	size?: 'default' | 'sm';
};

const ProfileCard = ({
	children,
	col = false,
	className = '',
}: ProfileCardProps) => {
	const classes = clsx('flex gap-3', {
		'flex-col': col,
		'items-center ': !col,
		[className]: className,
	});
	return <div className={classes}>{children}</div>;
};

ProfileCard.Image = function ProfileCardImage({
	profileImageUrl,
	alt,
	to = '',
	className = '',
	width = 28,
	height = 28,
}: ProfileImageProps) {
	return to ? (
		<Link to={to} className='flex-shrink-0 block'>
			<img
				src={profileImageUrl || 'assets/images/profile-placeholder.svg'}
				alt={alt}
				className={`rounded-full ${className}`}
				width={width}
				height={height}
			/>
		</Link>
	) : (
		<img
			src={profileImageUrl || 'assets/images/profile-placeholder.svg'}
			alt={alt}
			className={`rounded-full ${className}`}
			width={width}
			height={height}
		/>
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
	to = '',
	size = 'default',
	className = '',
}: ProfileCardNameProps) {
	const classes = clsx({
		'text-sm md:text-xs font-medium': size === 'sm',
		'text-base md:text-lg font-bold': size === 'default',
		'text-lg md:text-xl font-bold': size === 'lg',
		'text-xl md:text-2xl font-bold': size === 'xl',
		[className]: className,
	});
	return to ? (
		<Link to={to}>
			<h4 className={classes}>{children}</h4>
		</Link>
	) : (
		<h4 className={classes}>{children}</h4>
	);
};

ProfileCard.Username = function ProfileCardUsername({
	children,
	to = '',
	size = 'default',
	className = '',
}: ProfileCardUsernameProps) {
	const classes = clsx('text-light-3', {
		'text-xs md:text-sm': size === 'default',
		'text-[12px]': size === 'sm',
		[className]: className,
	});
	return to ? (
		<Link to={to}>
			<p className={classes}>@{children}</p>
		</Link>
	) : (
		<p className={classes}>@{children}</p>
	);
};

export default ProfileCard;
