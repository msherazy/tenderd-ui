import React from 'react';
import clsx from 'clsx';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    shadow?: boolean;
};

export const Card: React.FC<CardProps> = ({ shadow = true, className, children, ...props }) => (
    <div
        className={clsx(
            'bg-white dark:bg-gray-900 rounded-lg p-4',
            shadow && 'shadow-md',
            className
        )}
        {...props}
    >
        {children}
    </div>
);