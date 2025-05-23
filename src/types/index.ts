export interface SignupData {
  email: string;
  name: string;
  password: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface HomeProps {
  name: string;
}

export interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    type: 'Sedan' | 'SUV' | 'Truck' | 'Van' | 'Electric';
    status: 'Active' | 'Maintenance' | 'Inactive';
    licensePlate: string;
    mileage: number;
    lastServiceDate: string;
    color: string;
    fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
    location: string;
    vin: string;
    purchaseDate: string;
    dailyUsage: number[];
    weeklyUsage: number[];
};

export type VehicleFormData = Omit<Vehicle, 'id' | 'dailyUsage' | 'weeklyUsage'>;

