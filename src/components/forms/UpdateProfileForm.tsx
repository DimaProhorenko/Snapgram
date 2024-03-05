import { useUserContext } from '@/context/AuthContext';
import { UpdateProfileValidationSchema } from '@/lib/validation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { FileUploder } from '../shared';
import { Button } from '../ui/button';

const UpdateProfileForm = () => {
	const {
		user: { username, name, imageUrl },
	} = useUserContext();
	const form = useForm<z.infer<typeof UpdateProfileValidationSchema>>({
		defaultValues: {
			name,
			username,
			file: [],
		},
	});

	const onSubmit = (
		values: z.infer<typeof UpdateProfileValidationSchema>
	) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full name</FormLabel>
							<FormControl>
								<Input
									placeholder='Full name'
									{...field}
									className='shad-input'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder='Username'
									{...field}
									className='shad-input'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='file'
					render={({ field }) => (
						<FormItem className='max-w-sm'>
							<FormLabel className='shad-form_label'>
								Add your photos
							</FormLabel>
							<FormControl>
								<FileUploder
									changeField={field.onChange}
									mediaUrl={imageUrl}
									imageSize='circle'
								/>
							</FormControl>
							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>
				<Button className='bg-primary-500 hover:bg-primary-600 transition-colors mt-8 block '>
					Save updates
				</Button>
			</form>
		</Form>
	);
};
export default UpdateProfileForm;
