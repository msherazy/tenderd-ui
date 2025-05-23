// Mock data service for vehicle data
// Mock data service for vehicle data
import type {Vehicle} from '../types';

export const mockVehicles: Vehicle[] = [
    {
        id: '1',
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
        type: 'Sedan',
        status: 'Active',
        licensePlate: 'ABC123',
        mileage: 12500,
        lastServiceDate: '2023-05-15',
        color: 'Silver',
        fuelType: 'Gasoline',
        location: 'Downtown Garage',
        vin: '1HGCM82633A123456',
        purchaseDate: '2022-01-10',
        dailyUsage: [50, 45, 60, 55, 70, 0, 0],
        weeklyUsage: [320, 280, 350, 300],
    },
    {
        id: '2',
        make: 'Tesla',
        model: 'Model 3',
        year: 2023,
        type: 'Electric',
        status: 'Active',
        licensePlate: 'DEF456',
        mileage: 8000,
        lastServiceDate: '2023-06-20',
        color: 'Red',
        fuelType: 'Electric',
        location: 'Main Office',
        vin: '5YJ3E1EA0PF123456',
        purchaseDate: '2023-02-15',
        dailyUsage: [120, 110, 130, 115, 125, 90, 0],
        weeklyUsage: [690, 720, 680, 700],
    },
    {
        id: '3',
        make: 'Ford',
        model: 'F-150',
        year: 2021,
        type: 'Truck',
        status: 'Maintenance',
        licensePlate: 'GHI789',
        mileage: 35000,
        lastServiceDate: '2023-04-10',
        color: 'Black',
        fuelType: 'Diesel',
        location: 'Service Center',
        vin: '1FTFW1E53MFA12345',
        purchaseDate: '2021-08-22',
        dailyUsage: [80, 75, 90, 0, 0, 0, 0],
        weeklyUsage: [245, 260, 280, 0],
    },
    {
        id: '4',
        make: 'Honda',
        model: 'Odyssey',
        year: 2020,
        type: 'Van',
        status: 'Inactive',
        licensePlate: 'JKL012',
        mileage: 42000,
        lastServiceDate: '2023-01-30',
        color: 'Blue',
        fuelType: 'Gasoline',
        location: 'Storage Facility',
        vin: '5FNRL5H97LB123456',
        purchaseDate: '2020-05-18',
        dailyUsage: [0, 0, 0, 0, 0, 0, 0],
        weeklyUsage: [0, 0, 0, 0],
    },
    {
        id: '5',
        make: 'Subaru',
        model: 'Outback',
        year: 2023,
        type: 'SUV',
        status: 'Active',
        licensePlate: 'MNO345',
        mileage: 9500,
        lastServiceDate: '2023-07-05',
        color: 'Green',
        fuelType: 'Hybrid',
        location: 'Field Office',
        vin: '4S4BSANC3P3234567',
        purchaseDate: '2023-03-12',
        dailyUsage: [65, 70, 60, 75, 80, 40, 0],
        weeklyUsage: [390, 410, 380, 420],
    },
];

// Simulate an API call to fetch vehicles
export const fetchVehicles = async (): Promise<Vehicle[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockVehicles;
};

// Function to add a new vehicle
export const addVehicle = async (vehicle: Omit<Vehicle, 'id' | 'dailyUsage' | 'weeklyUsage'>): Promise<Vehicle> => {
    const newVehicle: Vehicle = {
        ...vehicle,
        id: Math.random().toString(36).substring(2, 9),
        dailyUsage: [],
        weeklyUsage: [],
    };

    // In a real app, we would send this to an API
    // For now, just return the new vehicle
    return newVehicle;
};
