import { render, screen, fireEvent } from '@testing-library/react';
import { AddMaintenanceForm } from '../AddMaintenanceForm';

describe('AddMaintenanceForm', () => {
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);

  const todayStr = today.toISOString().split('T')[0];
  const nextMonthStr = nextMonth.toISOString().split('T')[0];

  const defaultProps = {
    formData: {
      date: todayStr,
      description: 'Oil Change',
      cost: 50,
      mileage: 5000,
      serviceCenter: 'Test Center',
      notes: 'Test Notes',
      nextDueDate: nextMonthStr
    },
    formErrors: {},
    onFormChange: jest.fn(),
    onFormSubmit: jest.fn(),
    onCancel: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders fields and submit button', () => {
    const { container } = render(<AddMaintenanceForm {...defaultProps} />);
    expect(screen.getByTestId('maintenance-date-input')).toBeInTheDocument();
    expect(screen.getByTestId('maintenance-description-input')).toBeInTheDocument();
    expect(screen.getByTestId('maintenance-cost-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('calls onFormSubmit when form is submitted', async () => {
    const handleSubmit = jest.fn(e => e.preventDefault());
    const { container } = render(
      <AddMaintenanceForm
        {...defaultProps}
        onFormSubmit={handleSubmit}
      />
    );
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect(handleSubmit).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  it('shows form errors when present', () => {
    const { container } = render(
      <AddMaintenanceForm
        {...defaultProps}
        formErrors={{
          date: 'Date is required',
          description: 'Description is required'
        }}
      />
    );

    expect(screen.getByText('Date is required')).toBeInTheDocument();
    expect(screen.getByText('Description is required')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
