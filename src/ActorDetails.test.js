import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ActorDetails from './ActorDetail';
import { useParams } from 'react-router-dom';

// Mock useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

describe('ActorDetails component', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: '1' }); // Mock useParams to return an id
  });

  it('renders loading message when loading is true', async () => {
    // Mock fetch to avoid actual network request
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));

    let component;
    await act(async () => {
      component = render(<ActorDetails />);
    });

    expect(component.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders error message when error occurs', async () => {
    // Mock fetch to simulate an error response
    global.fetch = jest.fn(() => Promise.reject(new Error('Test error')));

    let component;
    await act(async () => {
      component = render(<ActorDetails />);
    });

    expect(component.getByText(/Error: Test error/i)).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mock functions after each test
  });
});
