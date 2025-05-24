import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary' | 'danger';
	isLoading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	isLoading,
	children,
	...props
}) => (
	<button
		className={clsx(
			'inline-flex items-center px-4 py-2 rounded font-semibold focus:outline-none transition disabled:opacity-60',
			variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
			variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300',
			variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
			props.className,
		)}
		disabled={isLoading || props.disabled}
		{...props}
	>
		{isLoading && (
			<span className="w-4 h-4 mr-2 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
		)}
		{children}
	</button>
);
