import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { SigninValidationSchema } from '@/lib/validation';
import { useSignInAccountMutation } from '@/lib/react-query/queriesAndMutations';

import { useToast } from '@/components/ui/use-toast';
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

import { HOME, SIGNUP } from '@/constants/routes';
import { useUserContext } from '@/context/AuthContext';
import Page from '@/components/routes/Page';

const SigninForm = () => {
	const { toast } = useToast();
	const { checkAuthUser } = useUserContext();
	const { mutateAsync: signInUser, isPending: isLoading } =
		useSignInAccountMutation();
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof SigninValidationSchema>>({
		resolver: zodResolver(SigninValidationSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async ({
		email,
		password,
	}: z.infer<typeof SigninValidationSchema>) => {
		const session = await signInUser({ email, password });

		if (!session) {
			toast({
				title: 'Sign in failed',
				description: 'Something went wrong. Please try again',
			});
		}

		const isUserSignedIn = await checkAuthUser();
		if (isUserSignedIn) {
			form.reset();
			navigate(HOME);
		} else {
			toast({
				title: 'Signup failed',
				description: 'Signup failed. Please try again...',
			});
		}
	};

	return (
		<Page>
			<div className='max-w-sm mx-auto'>
				<Form {...form}>
					<div className='mb-6 text-center'>
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
		</Page>
	);
};
export default SigninForm;
