/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"PT Sans"', 'sans-serif'],
			},
			colors: {
				primary: '#e88247',
				dark: '#262b48',
				gray: {
					750: '#252F3F',
				},
			},
			boxShadow: {
				custom: '6px 5px 7px 0 rgba(220, 226, 238, .69)',
			},
			borderColor: theme => ({
				...theme('colors'),
				custom: 'rgba(220, 226, 238, .71)',
			}),
		},
	},
	plugins: [],
};
