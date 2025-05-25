import { useState, useEffect } from 'react';
import type { Vehicle } from '../types';
import type { ApiResponse } from '../services/api';
import api from '../services/api';

export function useVehicles() {
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		api
			.get<ApiResponse<Vehicle[]>>('/vehicles')
			.then(res => {
				if (res.data && Array.isArray(res.data.data)) {
					setVehicles(res.data.data);
				} else {
					console.error('Unexpected API response format:', res.data);
					setError('Invalid data format received from server');
				}
			})
			.catch(err => setError(err?.response?.data?.message || err.message))
			.finally(() => setLoading(false));
	}, []);

	return { vehicles, loading, error, setVehicles };
}
