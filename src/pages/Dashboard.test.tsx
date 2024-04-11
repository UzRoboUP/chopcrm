import { render, screen } from '@testing-library/react';

import Dashboard from './Dashboard';
import { ReactNode } from "react";

jest.mock("../ui/Heading", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="heading">Heading Mock</div>,
  };
});

jest.mock("../ui/Row", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: ReactNode }) => <div data-testid="row">{children}</div>,
  };
});

jest.mock("../features/dashboard/DashboardLayout", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="dashboard-layout">DashboardLayout Mock</div>,
  };
});


describe('Dashboard Component', () => {
  test('renders with its child components', () => {
    render(<Dashboard />);

    const heading = screen.getByTestId('heading');
    const row = screen.getByTestId('row');
    const dashboardLayout = screen.getByTestId('dashboard-layout');

    expect(heading).toBeInTheDocument();
    expect(row).toBeInTheDocument();
    expect(row).toContainElement(heading);
    expect(dashboardLayout).toBeInTheDocument();
  });
});
