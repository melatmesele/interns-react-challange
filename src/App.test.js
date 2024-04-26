import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ActorsList from './ActorList';
import ActorDetails from './ActorDetail';

test('renders ActorsList component', () => {
  render(
    <Router>
      <ActorsList />
    </Router>
  );
  const actorsListElement = screen.getByText(/List Of Actors/i);
  expect(actorsListElement).toBeInTheDocument();
});

test('renders ActorDetails component', () => {
  render(
    <Router>
      <ActorDetails />
    </Router>
  );
  const loadingElement = screen.getByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();
});
