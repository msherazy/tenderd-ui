import { useState, useEffect } from 'react';
import type { Vehicle } from '../types';
import type { ApiResponse } from '../services/api';
import api from '../services/api';
import {ENDPOINTS} from "../constants";

export function useVehicleDetails(id: string | null) {
	const [vehicle, setVehicle] = useState<Vehicle | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;
		setLoading(true);
		api
			.get<ApiResponse<Vehicle>>(`${ENDPOINTS.VEHICLE}/${id}`)
			.then(res => setVehicle(res.data.data))
			.catch(err => setError(err?.response?.data?.message || err.message))
			.finally(() => setLoading(false));
	}, [id]);

	return { vehicle, loading, error };
}
