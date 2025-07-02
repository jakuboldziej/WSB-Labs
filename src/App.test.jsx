import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock the health monitor component to avoid network calls in tests
jest.mock('../components/HealthMonitor', () => ({
  HealthMonitor: () => <div data-testid="health-monitor">Health Monitor</div>
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('App Component', () => {
  test('renders navigation bar', () => {
    renderWithRouter(<App />);
    // Assuming NavBar renders some navigation elements
    expect(document.querySelector('nav')).toBeInTheDocument();
  });

  test('renders health monitor', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('health-monitor')).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    renderWithRouter(<App />);
    expect(document.body).toBeInTheDocument();
  });
});
