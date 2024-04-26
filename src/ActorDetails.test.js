import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ActorDetails from './ActorDetail';
import { useParams } from 'react-router-dom';

// Mock the useParams hook to provide a valid id for testing
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

// Mock the global fetch function to simulate API responses
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        name: 'Luke Skywalker',
        gender: 'male',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        homeworld: 'https://swapi-api.hbtn.io/api/planets/1',
        films: [],
        species: [],
        vehicles: [],
        starships: []
      })
  })
);

describe('ActorDetails', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders actor details after fetching', async () => {
    // Mock the useParams hook to return a specific id for testing
    useParams.mockReturnValue({ id: '1' });
    
    // Render the ActorDetails component
    const { getByText } = render(<ActorDetails />);
    
    // Wait for data to be fetched and component to render
    await waitFor(() => {
      // Verify that the fetch function was called
      expect(fetch).toHaveBeenCalledTimes(1);
      
      // Verify that the actor details are rendered
     
      // Add other assertions for actor details here
    });
  });
});
