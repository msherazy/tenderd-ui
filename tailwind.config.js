/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx}', // Added to ensure all files are included
	],
	darkMode: 'class', // Ensure this is set to 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ['"PT Sans"', 'sans-serif'],
			},
			colors: {
				gray: {
					750: '#252F3F', // Custom shade for dark mode backgrounds
				},
			},
		},
	},
	plugins: [],
};
