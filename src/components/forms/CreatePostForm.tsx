import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreatePostValidationSchema } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { FileUploder } from '../shared';
import { Input } from '../ui/input';

const CreatePostForm = () => {
	const form = useForm<z.infer<typeof CreatePostValidationSchema>>({
		resolver: zodResolver(CreatePostValidationSchema),
		defaultValues: {
			caption: '',
			file: '',
		},
	});

	const onSubmit = (values: z.infer<typeof CreatePostValidationSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form
				className='flex flex-col w-full max-w-5xl gap-9'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='caption'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>
								Caption
							</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									className='shad-textarea custom-scrollbar'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='file'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>
								Add your photos
							</FormLabel>
							<FormControl>
								<FileUploder />
							</FormControl>
						</FormItem>
					)}
				/>
				{/* <FormField
					control={form.control}
					name='location'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>
								Add Location
							</FormLabel>
							<FormControl>
								<Input type='text' className='shad-input' />
							</FormControl>
						</FormItem>
					)}
				/> */}
				<Button className='bg-primary-500'>Create Post</Button>
			</form>
		</Form>
	);
};
export default CreatePostForm;
