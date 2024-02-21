/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';

const FileUploder = () => {
	const [file, setFile] = useState([]);
	console.log(file);
	const [fileUrl, setFileUrl] = useState('');
	console.log(setFileUrl, setFile);
	const onDrop = useCallback(() => {
		// setFile(acceptedFiles);
	}, []);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'image/*': ['.png', '.jpg', '.jpeg', '.svg'],
		},
	});
	return (
		<div
			{...getRootProps()}
			className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'
		>
			<input {...getInputProps()} className='mb-2 cursor-pointer' />
			{fileUrl ? (
				<div>Test 1</div>
			) : (
				<div className='file_uploader-box'>
					<img
						src='assets/icons/file-upload.svg'
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
