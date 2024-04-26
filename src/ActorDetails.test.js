import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ActorDetails from './ActorDetail';
import { useParams } from 'react-router-dom';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

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
    
    useParams.mockReturnValue({ id: '1' });
    
   
    const { getByText } = render(<ActorDetails />);
    

    await waitFor(() => {
     
      expect(fetch).toHaveBeenCalledTimes(1);
     
    });
  });
});
