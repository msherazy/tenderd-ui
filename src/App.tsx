import './index.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import VehicleListPage from './pages/VehicleListPage';
import VehicleDetailsPage from './pages/VehicleDetailsPage';

const App = () => {
	const [toast, setToast] = useState<string | null>(null);

	return (
		<BrowserRouter>
			<div className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-grow bg-gray-50">
					<div className="max-w-[1440px] mx-auto px-4 py-8">
						{toast && <Toast message={toast} onClose={() => setToast(null)} />}
						<Routes>
							<Route
								path="/"
								element={<VehicleListPage setToast={setToast} />}
							/>
							<Route
								path="/vehicles/:vehicleId"
								element={<VehicleDetailsPage setToast={setToast} />}
							/>
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</div>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default App;
