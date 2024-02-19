import { SigninValidationSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/shared/Loader';
import { Link } from 'react-router-dom';
import { SIGNUP } from '@/constants/routes';

const SigninForm = () => {
	const isLoading = false;
	const form = useForm<z.infer<typeof SigninValidationSchema>>({
		resolver: zodResolver(SigninValidationSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof SigninValidationSchema>) => {
		console.log(values);
	};

	return (
		<div className='max-w-sm mx-auto'>
			<Form {...form}>
				<div className='mb-6'>
					<h2 className='h3-bold md:h2-bold'>
						Sign into your account
					</h2>
					<p className='text-light-3 small-medium md:base-regular mt-2'>
						Welcome back! Enter your account details.
					</p>
				</div>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6'
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type='email'
										{...field}
										className='shad-input'
									/>
								</FormControl>
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
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						className='shad-button_primary w-full'
					>
						{isLoading ? <Loader /> : 'Signin'}
					</Button>
					<p className='text-small-regular text-light-2 text-center mt-2'>
						Don't have an account?{' '}
						<Link
							to={SIGNUP}
							className='text-primary-500 text-small-semibold ml-1'
						>
							Signup
						</Link>
					</p>
				</form>
			</Form>
		</div>
	);
};
export default SigninForm;
