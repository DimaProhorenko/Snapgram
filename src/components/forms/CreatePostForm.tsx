import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Models } from 'appwrite';

import { CreatePostValidationSchema } from '@/lib/validation';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { FileUploder } from '../shared';
import { Input } from '../ui/input';

type PostFormProps = {
	post?: Models.Document;
};

const CreatePostForm = ({ post }: PostFormProps) => {
	const form = useForm<z.infer<typeof CreatePostValidationSchema>>({
		resolver: zodResolver(CreatePostValidationSchema),
		defaultValues: {
			caption: post?.caption || '',
			file: [],
			location: post?.location || '',
			tags: post?.tags?.join(',') || '',
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
							<FormMessage className='shad-form_message' />
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
								<FileUploder
									changeField={field.onChange}
									mediaUrl={post?.imageUrl}
								/>
							</FormControl>
							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='location'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>
								Add Location
							</FormLabel>
							<FormControl>
								<Input
									type='text'
									className='shad-input'
									{...field}
								/>
							</FormControl>
							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='tags'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>
								Tags (separated by comma ",")
							</FormLabel>
							<FormControl>
								<Input
									type='text'
									className='shad-input'
									placeholder='Js, React, PHP'
									{...field}
								/>
							</FormControl>
							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>
				<div className='flex gap-3 items-stretch'>
					<Button type='button' className='shad-button_danger'>
						Cancel
					</Button>
					<Button
						type='submit'
						className='shad-button_primary whitespace-nowrap'
					>
						Create Post
					</Button>
				</div>
			</form>
		</Form>
	);
};
export default CreatePostForm;
