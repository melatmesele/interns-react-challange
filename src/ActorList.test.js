import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ActorsList from './ActorList';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

test('ActorsList Component displays actors after successful fetch', async () => {
  // Mock the API response
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

  // Use findByText to wait for the element to appear
  const actorElement = await screen.findByText("Luke Skywalker");
  expect(actorElement).toBeInTheDocument();
});
// import React from 'react';
// import { shallow } from 'enzyme';
// import ActorsList from './ActorList';

// describe('ActorsList component', () => {
//   it('renders loading message when loading is true', () => {
//     const wrapper = shallow(<ActorsList />);
//     wrapper.setState({ loading: true });
//     expect(wrapper.contains(<p>Loading...</p>)).toEqual(true);
//   });

//   it('renders error message when error occurs', () => {
//     const wrapper = shallow(<ActorsList />);
//     const error = new Error('Test error');
//     wrapper.setState({ error, loading: false });
//     expect(wrapper.contains(<p>Error: Test error</p>)).toEqual(true);
//   });

//   it('renders list of actors when actors are available', () => {
//     const actors = [
//       { name: 'Luke Skywalker', height: '172', birth_year: '19BBY', url: 'https://swapi-api.hbtn.io/api/people/1/' },
//       { name: 'Leia Organa', height: '150', birth_year: '19BBY', url: 'https://swapi-api.hbtn.io/api/people/5/' },
//     ];
//     const wrapper = shallow(<ActorsList />);
//     wrapper.setState({ actors, loading: false });
//     expect(wrapper.find('.actor-card')).toHaveLength(2);
//   });

//   it('renders pagination buttons when next or previous page URL is available', () => {
//     const wrapper = shallow(<ActorsList />);
//     wrapper.setState({ nextPageUrl: 'https://swapi-api.hbtn.io/api/people?page=2', loading: false });
//     expect(wrapper.find('.pagination button')).toHaveLength(1);
//   });

//   it('invokes setCurrentPageUrl with the correct URL when pagination button is clicked', () => {
//     const setCurrentPageUrlMock = jest.fn();
//     const wrapper = shallow(<ActorsList />);
//     wrapper.setState({ nextPageUrl: 'https://swapi-api.hbtn.io/api/people?page=2', loading: false });
//     wrapper.setProps({ setCurrentPageUrl: setCurrentPageUrlMock });
//     wrapper.find('.pagination button').simulate('click');
//     expect(setCurrentPageUrlMock).toHaveBeenCalledWith('https://swapi-api.hbtn.io/api/people?page=2');
//   });
// });
