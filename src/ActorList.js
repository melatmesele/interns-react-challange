// ActorsList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './actorList.css';


const ActorsList = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://swapi-api.hbtn.io/api/people');
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(currentPageUrl);
        const data = await response.json();
        setActors(data.results);
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPageUrl]);

  // Wrap state updates in act() to avoid warnings
  // useEffect(() => {
  //   if (loading || error) {
  //     // No need to wrap setLoading and setError since they're not async
  //     return;
  //   }
  //   // Wrap state updates in act() to avoid warnings
  //   act(() => {
  //     setActors(actors);
  //     setNextPageUrl(nextPageUrl);
  //     setPrevPageUrl(prevPageUrl);
  //   });
  // }, [loading, error, actors, nextPageUrl, prevPageUrl]);

  return (
    <div className="containers">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <p className='topic'><strong>List Of Actors</strong></p>
      <div className="actors-list">
        {actors && actors.map((actor) => (
          <div key={actor.name} className="actor-card">
            <h2>{actor.name}</h2>
            <p>Height: {actor.height}</p>
            <p>Birth Year: {actor.birth_year}</p>
            <Link to={`/actor/${actor.url && actor.url.split('/').slice(-2, -1)}`}>
              <button>Detail</button>
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        {prevPageUrl && <button onClick={() => setCurrentPageUrl(prevPageUrl)}>Previous</button>}
        {nextPageUrl && <button onClick={() => setCurrentPageUrl(nextPageUrl)}>Next</button>}
      </div>
    </div>
  );
};

export default ActorsList;
