import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ActorsList from './ActorList';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

test('ActorsList Component displays actors after successful fetch', async () => {
 
  fetchMock.mockResponseOnce(JSON.stringify({
    results: [
      { name: "Luke Skywalker", height: "172", url: "https://swapi-api.hbtn.io/api/people/1/" }
    ],
    next: null,
    previous: null
  }));

  render(
    <MemoryRouter>
      <ActorsList />
    </MemoryRouter>
  );

  
  const actorElement = await screen.findByText("Luke Skywalker");
  expect(actorElement).toBeInTheDocument();
});
