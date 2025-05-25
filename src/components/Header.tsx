export const Header = () => {
	return (
		<header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center space-x-4"> {/* Added space-x-4 for spacing */}
						<img
							src="https://tenderd.com/images/Logo-svg.svg"
							alt="Tenderd Logo"
							className="h-8 w-auto sm:h-8 sm:w-auto max-h-8 max-w-[170px] object-contain"
							style={{ height: '2rem', width: 'auto' }}
						/>
						{/* Responsive Chip Title */}
						<div className="hidden sm:flex items-center px-3 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
							Fleet Management Dashboard
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
