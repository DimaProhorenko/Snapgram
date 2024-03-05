import UpdateProfileForm from '@/components/forms/UpdateProfileForm';
import Page from '@/components/routes/Page';

const UpdateProfile = () => {
	return (
		<Page>
			<div className='update-profile-container'>
				<h2 className='h3-bold md:h2-bold text-left w-full'>
					Update your profile
				</h2>
				<UpdateProfileForm />
			</div>
		</Page>
	);
};
export default UpdateProfile;
