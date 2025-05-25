import { render, screen, fireEvent } from '@testing-library/react';
import { VehicleDetails } from '../VehicleDetails';
import type { Vehicle } from '../../../types';

jest.mock('../../../hooks', () => ({
  useCreateMaintenance: () => ({
    mutateAsync: jest.fn().mockResolvedValue({ _id: 'new-maintenance-id' }),
    loading: false
  })
}));

describe('VehicleDetails Component', () => {
  const mockVehicle: Vehicle = {
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
    location: 'Main Office',
    color: 'Silver',
    dailyUsage: [],
    weeklyUsage: [],
    maintenanceHistory: [
      {
        _id: 'maintenance-1',
        description: 'Oil Change',
        date: '2022-06-01',
        cost: 50,
        mileage: 10000,
        vehicle: '',
        createdAt: '',
        updatedAt: ''
      }
    ]
  };

  const mockProps = {
    vehicle: mockVehicle,
    activeTab: 'details',
    onTabChange: jest.fn(),
    onBack: jest.fn()
  };


  test('matches snapshot', () => {
    const { container } = render(<VehicleDetails {...mockProps} />);
    expect(container).toMatchSnapshot();
  });


  test('renders vehicle details correctly', () => {
    render(<VehicleDetails {...mockProps} />);

    // Check if vehicle information is displayed
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();

    // Use getByTestId instead of getByText for the year element
    const yearPlateElement = screen.getByTestId('vehicle-year-plate');
    expect(yearPlateElement).toBeInTheDocument();
    expect(yearPlateElement.textContent).toContain('2022');

    expect(screen.getByText('ABC123')).toBeInTheDocument();
  });

  test('changes tab when tab button is clicked', () => {
    render(<VehicleDetails {...mockProps} />);

    // Check that the details tab is active
    const maintenanceTab = screen.getByText('Maintenance');
    expect(maintenanceTab).toBeInTheDocument();

    // Click on the maintenance tab
    fireEvent.click(maintenanceTab);

    // The onTabChange should be called with 'maintenance'
    expect(mockProps.onTabChange).toHaveBeenCalledWith('maintenance');
  });

  test('renders maintenance history when on maintenance tab', () => {
    render(<VehicleDetails {...mockProps} activeTab="maintenance" />);

    expect(screen.getByText('Maintenance History')).toBeInTheDocument();

    // Should show the maintenance entry
    expect(screen.getByText('Oil Change')).toBeInTheDocument();
  });
});
