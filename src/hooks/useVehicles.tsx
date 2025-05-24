import { useState, useEffect } from 'react';
import type { Vehicle } from '../types';
import api from '../services/api';

export function useVehicles() {
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		api
			.get('/vehicles')
			.then(res => setVehicles(res.data.data))
			.catch(err => setError(err?.response?.data?.message || err.message))
			.finally(() => setLoading(false));
	}, []);

	return { vehicles, loading, error, setVehicles };
}
