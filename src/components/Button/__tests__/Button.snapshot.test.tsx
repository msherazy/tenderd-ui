import { render } from '@testing-library/react';
import { Index as Button } from '../index';

describe('Button Component Snapshots', () => {
  test('primary button renders correctly', () => {
    const { container } = render(<Button variant="primary">Primary Button</Button>);
    expect(container).toMatchSnapshot();
  });

  test('secondary button renders correctly', () => {
    const { container } = render(<Button variant="secondary">Secondary Button</Button>);
    expect(container).toMatchSnapshot();
  });

  test('danger button renders correctly', () => {
    const { container } = render(<Button variant="danger">Danger Button</Button>);
    expect(container).toMatchSnapshot();
  });

  test('ghost button renders correctly', () => {
    const { container } = render(<Button variant="ghost">Ghost Button</Button>);
    expect(container).toMatchSnapshot();
  });

  test('full width button renders correctly', () => {
    const { container } = render(<Button fullWidth>Full Width Button</Button>);
    expect(container).toMatchSnapshot();
  });

  test('loading button renders correctly', () => {
    const { container } = render(<Button isLoading>Loading Button</Button>);
    expect(container).toMatchSnapshot();
  });

  test('disabled button renders correctly', () => {
    const { container } = render(<Button disabled>Disabled Button</Button>);
    expect(container).toMatchSnapshot();
  });
});
