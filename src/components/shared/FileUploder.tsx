import { useState, useCallback } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';
import clsx from 'clsx';

type FileUploderType = {
	mediaUrl: string;
	// eslint-disable-next-line no-unused-vars
	changeField: (arg: FileWithPath[]) => void;
	imageSize?: 'circle' | 'default';
};

const FileUploder = ({
	mediaUrl,
	changeField,
	imageSize = 'default',
}: FileUploderType) => {
	const [file, setFile] = useState<File[]>([]);
	const [fileUrl, setFileUrl] = useState(mediaUrl);

	console.log(file);

	const onDrop = useCallback(
		(acceptedFiles: FileWithPath[]) => {
			setFile(acceptedFiles);
			changeField(acceptedFiles);
			setFileUrl(URL.createObjectURL(acceptedFiles[0]));
		},
		[changeField]
	);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'image/*': ['.png', '.jpg', '.jpeg', '.svg'],
		},
	});

	const imageClasses = clsx({
		'file_uploader-img': imageSize === 'default',
		'w-24 h-24 rounded-full': imageSize === 'circle',
	});
	return (
		<div
			{...getRootProps()}
			className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'
		>
			<input {...getInputProps()} className='mb-2 cursor-pointer' />
			{fileUrl ? (
				<>
					<div className='flex flex-1 justify-center w-full p-5 lg:p-10 '>
						<img
							src={fileUrl}
							alt='image'
							className={imageClasses}
						/>
					</div>
					<p className='file_uploader-label'>
						Click or drag photo to replace
					</p>
				</>
			) : (
				<div className='file_uploader-box'>
					<img
						src='/assets/icons/file-upload.svg'
						alt='upload'
						width={96}
						height={77}
					/>
					<h3 className='base-medium text-light-2 mb-2 mt-6'>
						Drag photo here
					</h3>
					<p className='text-light-4 small-regular mb-6'>
						SVG, PNG, JPG
					</p>
					<Button className='shad-button_dark_4'>
						Select from computer
					</Button>
				</div>
			)}
		</div>
	);
};
export default FileUploder;
