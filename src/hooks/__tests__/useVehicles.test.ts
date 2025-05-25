import { renderHook, waitFor } from '@testing-library/react';
import { useVehicles } from '../useVehicles';
import api from '../../services/api';

// Mock the API module
jest.mock('../../services/api', () => ({
	get: jest.fn(),
}));

describe('useVehicles', () => {
	const mockVehicles = [
		{
			_id: 'vehicle-1',
			make: 'Toyota',
			model: 'Camry',
			year: 2022,
			type: 'Sedan',
			status: 'Active',
			mileage: 15000,
			licensePlate: 'ABC123',
			createdAt: '2022-01-01',
			updatedAt: '2022-06-01',
		},
		{
			_id: 'vehicle-2',
			make: 'Honda',
			model: 'CR-V',
			year: 2021,
			type: 'SUV',
			status: 'Maintenance',
			mileage: 20000,
			licensePlate: 'XYZ789',
			createdAt: '2022-01-05',
			updatedAt: '2022-06-01',
		},
	];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should fetch vehicles successfully', async () => {
		// Mock the API response
		(api.get as jest.Mock).mockResolvedValueOnce({
			data: { data: mockVehicles, success: true },
		});

		// Render the hook
		const { result } = renderHook(() => useVehicles());

		// Initially should be loading with no vehicles
		expect(result.current.loading).toBe(true);
		expect(result.current.vehicles).toEqual([]);
		expect(result.current.error).toBe(null);

		// Wait for the hook to complete
		await waitFor(() => expect(result.current.loading).toBe(false));

		// Should have the vehicles and no error
		expect(result.current.vehicles).toEqual(mockVehicles);
		expect(result.current.error).toBe(null);
	});

	test('should handle error when fetching vehicles fails', async () => {
		const errorMessage = 'Failed to fetch vehicles';

		// Mock the API response with an error
		(api.get as jest.Mock).mockRejectedValueOnce({
			message: errorMessage,
			response: { data: { message: errorMessage } },
		});

		// Render the hook
		const { result } = renderHook(() => useVehicles());

		// Wait for the hook to complete
		await waitFor(() => expect(result.current.loading).toBe(false));

		// Should have an error and no vehicles
		expect(result.current.vehicles).toEqual([]);
		expect(result.current.error).toBe(errorMessage);
	});
});
