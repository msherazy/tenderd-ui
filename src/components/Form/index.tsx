import React from 'react';

const inputBaseStyles = `
  block w-full rounded-md shadow-sm px-3 py-2
  border-gray-300 focus:ring-indigo-500 focus:border-indigo-500
`;

const inputErrorStyles = `
  border-red-300 focus:ring-red-500 focus:border-red-500
`;

const labelStyles = `
  block text-sm font-medium text-gray-700 mb-1
`;

export const FormInput = ({
	label,
	name,
	type = 'text',
	value,
	onChange,
	error,
	required = false,
	min,
	max,
	placeholder,
	noLabel = false,
	onBlur,
	'data-testid': testId, // Add data-testid prop
	...rest // Rest of props
}: {
	label: string;
	name: string;
	type?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	error?: string;
	required?: boolean;
	min?: string;
	max?: string;
	placeholder?: string;
	noLabel?: boolean;
	'data-testid'?: string; // Add type for data-testid
	[key: string]: any; // Allow additional props
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}) => {
	const inputId = `input-${name}`;

	return (
		<div className="mb-4">
			{!noLabel && (
				<label htmlFor={inputId} className={labelStyles}>
					{label}
					{required && <span className="text-red-600 ml-1">*</span>}
				</label>
			)}

			{type === 'textarea' ? (
				<textarea
					id={inputId}
					name={name}
					value={value}
					onChange={onChange}
					required={required}
					placeholder={placeholder}
					className={`${inputBaseStyles} ${error ? inputErrorStyles : ''}`}
					data-testid={testId} // Apply data-testid to textarea
					{...rest}
				/>
			) : (
				<input
					id={inputId}
					name={name}
					type={type}
					value={value}
					onChange={onChange}
					required={required}
					min={min}
					max={max}
					placeholder={noLabel ? label : placeholder}
					className={`${inputBaseStyles} ${error ? inputErrorStyles : ''}`}
					data-testid={testId} // Apply data-testid to input
					{...rest}
				/>
			)}

			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
		</div>
	);
};

export const FormSelect = ({
	label,
	name,
	value,
	onChange,
	options,
	noLabel = false,
	error,
	required = false,
}: {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: { value: string; label: string }[];
	noLabel?: boolean;
	error?: string;
	required?: boolean;
}) => {
	return (
		<div className="w-full">
			{!noLabel && (
				<label htmlFor={name} className={labelStyles}>
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}
			<select
				name={name}
				id={name}
				value={value}
				onChange={onChange}
				className={`${inputBaseStyles} px-3 py-2 ${error ? inputErrorStyles : ''}`}
			>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
		</div>
	);
};

export const SearchInput = ({
	value,
	onChange,
	placeholder,
}: {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
}) => {
	return (
		<div className="relative">
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<svg
					className="h-5 w-5 text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fillRule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
			<input
				type="text"
				className={`${inputBaseStyles} pl-10`}
				placeholder={placeholder || 'Search...'}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};
