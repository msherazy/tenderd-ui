import './index.css';
import { useEffect, useState } from 'react';
import { Outlet } from '@tanstack/react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Index } from './components/Toast';

const App = () => {
	const [toast, setToast] = useState<string | null>(null);

	// Store the setToast function in the global state
	useEffect(() => {
		if (window.__APP_STATE__) {
			window.__APP_STATE__.setToast = setToast;
		}
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow bg-gray-50">
				<div className="max-w-[1440px] mx-auto px-4 py-8">
					{toast && <Index message={toast} onClose={() => setToast(null)} />}
					<Outlet />
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default App;
