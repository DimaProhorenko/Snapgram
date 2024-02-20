import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { SignupValidationSchema } from '@/lib/validation';
import {
	useCreateUserAccountMutation,
	useSignInAccountMutation,
} from '@/lib/react-query/queriesAndMutations';

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
import Loader from '@/components/shared/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

import { HOME, SIGNIN } from '@/constants/routes';
import { useUserContext } from '@/context/AuthContext';

const SignupForm = () => {
	const navigate = useNavigate();
	const { checkAuthUser } = useUserContext();
	const { toast } = useToast();
	const { mutateAsync: createNewUser, isPending: isLoading } =
		useCreateUserAccountMutation();

	const { mutateAsync: signInAccount } = useSignInAccountMutation();

	const form = useForm<z.infer<typeof SignupValidationSchema>>({
		resolver: zodResolver(SignupValidationSchema),
		defaultValues: {
			name: '',
			username: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = async (
		values: z.infer<typeof SignupValidationSchema>
	): Promise<void> => {
		const newUser = await createNewUser(values);
		if (!newUser) {
			toast({
				title: 'Signup Failed',
				description: 'Something went wrong. Please try again...',
			});
			return;
		}

		const session = signInAccount({
			email: values.email,
			password: values.password,
		});

		if (!session) {
			toast({
				title: 'Session failed',
				description: 'Something went wrong. Please try again...',
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
		<div className='max-w-sm mx-auto'>
			<Form {...form}>
				<div className='mb-6 text-center'>
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
							to={SIGNIN}
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
