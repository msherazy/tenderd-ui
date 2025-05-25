import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
	isLoading?: boolean;
	fullWidth?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	isLoading,
	fullWidth = false,
	children,
	className,
	...props
}) => (
	<button
		style={{
			...(variant === 'primary' ? { backgroundColor: 'var(--color-primary)', color: '#ffffff' } : {})
		}}
		className={clsx(
			'inline-flex items-center justify-center px-4 py-2 rounded font-semibold focus:outline-none transition disabled:opacity-60',
			fullWidth ? 'w-full' : 'w-auto',
			variant === 'primary' && 'hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-primary',
			variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300',
			variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
			variant === 'ghost' && 'text-gray-500 hover:text-primary hover:border-primary focus:text-primary focus:border-primary',
			className,
		)}
		disabled={isLoading || props.disabled}
		{...props}
	>
		{isLoading && (
			<span className="w-4 h-4 mr-2 border-2 border-t-transparent border-current rounded-full animate-spin"></span>
		)}
		{children}
	</button>
);
