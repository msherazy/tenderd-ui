import { renderHook, waitFor } from '@testing-library/react';
import { useVehicleDetails } from '../useVehicleDetails';
import api from '../../services/api';

// Mock the API module
jest.mock('../../services/api', () => ({
	get: jest.fn(),
}));

describe('useVehicleDetails', () => {
	const mockVehicle = {
		_id: 'vehicle-1',
		make: 'Toyota',
		model: 'Camry',
		year: 2022,
		type: 'Sedan',
		status: 'Active',
		mileage: 15000,
		licensePlate: 'ABC123',
		vin: '1HGCM82633A123456',
		fuelType: 'Gasoline',
		purchaseDate: '2022-01-01',
		lastServiceDate: '2022-06-01',
		createdAt: '2022-01-01',
		updatedAt: '2022-06-01',
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should fetch vehicle details successfully', async () => {
		// Mock the API response
		(api.get as jest.Mock).mockResolvedValueOnce({
			data: { data: mockVehicle, success: true },
		});

		// Render the hook with a vehicle ID
		const { result } = renderHook(() => useVehicleDetails('vehicle-1'));

		// Initially should be loading with no vehicle data
		expect(result.current.loading).toBe(true);
		expect(result.current.vehicle).toBeNull();
		expect(result.current.error).toBeNull();

		// Wait for the hook to complete
		await waitFor(() => expect(result.current.loading).toBe(false));

		// Should have the vehicle data and no error
		expect(result.current.vehicle).toEqual(mockVehicle);
		expect(result.current.error).toBeNull();

		// Verify API was called with the correct endpoint
		expect(api.get).toHaveBeenCalledWith('/vehicles/vehicle-1');
	});

	test('should handle error when fetching vehicle details fails', async () => {
		const errorMessage = 'Failed to fetch vehicle details';

		// Mock the API response with an error
		(api.get as jest.Mock).mockRejectedValueOnce({
			message: errorMessage,
			response: { data: { message: errorMessage } },
		});

		// Render the hook with a vehicle ID
		const { result } = renderHook(() => useVehicleDetails('vehicle-1'));

		// Wait for the hook to complete
		await waitFor(() => expect(result.current.loading).toBe(false));

		// Should have an error and no vehicle data
		expect(result.current.vehicle).toBeNull();
		expect(result.current.error).toBe(errorMessage);
	});

	test('should not fetch when id is null', () => {
		// Render the hook with null ID
		const { result } = renderHook(() => useVehicleDetails(null));

		// Should not trigger loading state or API call
		expect(result.current.loading).toBe(false);
		expect(api.get).not.toHaveBeenCalled();
	});
});
