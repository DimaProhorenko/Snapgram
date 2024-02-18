import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { SignupValidationSchema } from '@/lib/validation';
import Loader from '@/components/shared/Loader';
import { Link } from 'react-router-dom';

const SignupForm = () => {
	const isLoading = false;
	const form = useForm<z.infer<typeof SignupValidationSchema>>({
		resolver: zodResolver(SignupValidationSchema),
		defaultValues: {
			name: '',
			username: '',
			email: '',
			password: '',
		},
	});
	const onSubmit = (values: z.infer<typeof SignupValidationSchema>): void => {
		console.log(values);
	};
	return (
		<div className='max-w-sm mx-auto'>
			<Form {...form}>
				<div className='mb-6'>
					<h2 className='h3-bold md:h2-bold'>Create a new account</h2>
					<p className='text-light-3 small-medium md:base-regular mt-2'>
						To use snapgram enter your profile details
					</p>
				</div>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										type='text'
										className='shad-input'
										{...field}
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
										type='text'
										className='shad-input'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type='email'
										className='shad-input'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type='password'
										className='shad-input'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						className='shad-button_primary w-full'
					>
						{isLoading ? <Loader /> : 'Signup'}
					</Button>
					<p className='text-small-regular text-light-2 text-center mt-2'>
						Already have an account?{' '}
						<Link
							to='/singin'
							className='text-primary-500 text-small-semibold ml-1'
						>
							Signin
						</Link>
					</p>
				</form>
			</Form>
		</div>
	);
};
export default SignupForm;
