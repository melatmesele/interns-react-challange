import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ActorsDetail.css';

const ActorDetails = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [films, setFilms] = useState([]);
  const [species, setSpecies] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);
  const [homeworld, setHomeworld] = useState('');

  const fetchDataForUrls = async (urls, setState) => {
    try {
      if (!urls) throw new Error('URLs list is undefined or not provided');
      const responses = await Promise.all(urls.map(url => fetch(url)));
      const data = await Promise.all(
        responses.map(response => {
          if (!response || !response.ok) { // Add a check for response
            throw new Error(`Failed to fetch: ${response ? response.statusText : 'Unknown error'}`);
          }
          return response.json();
        })
      );
      setState(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError(error);
    }
  };
  
  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi-api.hbtn.io/api/people/${id}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch actor details');
      }
      const data = await response.json();
      setActor(data);
  
      // Ensure data properties are available before accessing them
      const filmsData = Array.isArray(data.films) ? data.films : [];
      const speciesData = Array.isArray(data.species) ? data.species : [];
      const vehiclesData = Array.isArray(data.vehicles) ? data.vehicles : [];
      const starshipsData = Array.isArray(data.starships) ? data.starships : [];
  
      fetchDataForUrls(filmsData, setFilms);
      fetchDataForUrls(speciesData, setSpecies);
      fetchDataForUrls(vehiclesData, setVehicles);
      fetchDataForUrls(starshipsData, setStarships);
  
      if (data.homeworld) {
        const homeworldResponse = await fetch(data.homeworld);
        if (!homeworldResponse.ok) {
          throw new Error('Failed to fetch homeworld details');
        }
        const homeworldData = await homeworldResponse.json();
        setHomeworld(homeworldData.name);
      }
  
    } catch (error) {
      console.error("Error fetching details:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    fetchDetails();
  }, [id]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="container">
      {actor && (
        <>
          <div className='main'>
            <div className='circle'> <p className='firstLetter'>{actor.name ? actor.name[0] : ''}</p></div>
            <p className='firstName'> {actor.name}</p>


            <div className="gender">
              <p>{actor.gender}</p>
            </div>

            <div className='sectionTwo'>

              <div className='card'>
                <div className="actor-details-section">

                  <div className="cards">
                    <div className='partOne'>
                      <div className="card1">

                        <div className="card-header">
                          <h2 className='card2Height'>Height</h2>
                        </div>
                        <div className="card-body">
                          <p className='card2Height'>{actor.height}</p>
                        </div>

                      </div>
                      <div className="card2">

                        <div className="card-header">

                          <h2 className="card2H2">Mass</h2>
                        </div>
                        <div className="card-body">
                          <p className='card2H2'>{actor.mass}</p>
                        </div>

                      </div>
                      <div className="card3">

                        <div className="card-header">
                          <h2>Hair Color</h2>
                        </div>
                        <div className="card-body">
                          <p>{actor.hair_color}</p>
                        </div>

                      </div>
                      <div className="card4">

                        <div className="card-header">
                          <h2>Skin Color</h2>
                        </div>
                        <div className="card-body">
                          <p>{actor.skin_color}</p>
                        </div>

                      </div>
                      <div className="card5">
                        <div className="card-header">
                          <h2>Eye Color</h2>
                        </div>
                        <div className="card-body">
                          <p>{actor.eye_color}</p>
                        </div>
                      </div>
                      <div className="card6">
                        <div className="card-header">
                          <h2>Birth Year</h2>
                        </div>
                        <div className="card-body">
                          <p>{actor.birth_year}</p>
                        </div>

                      </div>
                      <div className="card6">
                        <div className="card-header">
                          <h2>Home World</h2>
                        </div>
                        <div className="card-body">
                          <p>{homeworld}</p>
                        </div>

                      </div>

                    </div>



                  </div>

                </div>
              </div>
              <div className="species-section">
                <h4>Species</h4>
                <div className="species-container">
                  {species.length > 0 ? (
                    species.map((specie, index) => (
                      <div key={index} className="species-item" style={{
                        flex: `0 0 ${species.length === 1 ? '100%' : 'calc(50% - 10px)'}`
                      }}>
                        <div className="card3">

                          <div className="card-header">
                            <h2 className='card2Height'>Name</h2>
                          </div>
                          <div className="card-body">
                            <p className='card2Height'>{specie.name}</p>
                          </div>

                        </div>
                        <div className="card4">

                          <div className="card-header">
                            <h2 className='card2Height'>Classification</h2>
                          </div>
                          <div className="card-body">
                            <p className='card2Height'>{specie.classification}</p>
                          </div>

                        </div>
                        <div className="card5">

                          <div className="card-header">
                            <h2 className='card2Height'>Designation</h2>
                          </div>
                          <div className="card-body">
                            <p className='card2Height'>{specie.designation}</p>
                          </div>

                        </div>
                        <div className="card6">

                          <div className="card-header">
                            <h2 className='card2Height'>Average Height</h2>
                          </div>
                          <div className="card-body">
                            <p className='card2Height'>{specie.average_height} </p>
                          </div>

                        </div>



                      </div>
                    ))
                  ) : (

                    <div className="species-item" style={{ flex: '0 0 100%' }}>
                      <p>No species available</p>
                    </div>
                  )}
                </div>

              </div>

              <div className="films-section">
                <h4>Films</h4>
                <div className="films-container">

                  {films.length > 0 ? (
                    films.map((film, index) => (
                      <div key={index} className="film-item" style={{
                        flex: `0 0 ${films.length === 1 ? '100%' : 'calc(50% - 10px)'}`
                      }}>
                        <div className='Filmheader'><h5>{film.title} (Episode {film.episode_id})</h5></div>
                        <div className='space'> <div className='items'><div className='key'><p><strong>Director</strong> </p></div><div className='insider'>{film.director}</div></div>
                          <div className='items'><div className='key'><p><strong>Producer</strong></p> </div><div className='insider'> {film.producer}</div></div>
                          <div className='items'><div className='key'><p><strong>Release Date</strong> </p></div><div className='insider'> {film.release_date}</div></div>
                        </div>



                      </div>
                    ))
                  ) : (

                    <div className="film-item" style={{ flex: '0 0 100%' }}>
                      <p>No films available</p>
                    </div>
                  )}
                </div>

              </div>
              <div className="vehicles-section">
                <h4>Vehicles</h4>
                <div className="vehicles-container">
                  {vehicles.length > 0 ? (
                    vehicles.map((vehicle, index) => (
                      <div key={index} className="vehicles-item" style={{
                        flex: `0 0 ${vehicle.length === 1 ? '100%' : 'calc(50% - 10px)'}`
                      }}>
                        <h5>{vehicle.name}</h5>

                        <div className='items'><div className='key'><p><strong>Model</strong> </p></div><div className='insider'>{vehicle.model}</div></div>
                        <div className='items'><div className='key'><p><strong>Manufacturer</strong></p> </div><div className='insider'> {vehicle.manufacturer}</div></div>
                        <div className='items'><div className='key'><p><strong>Max_atmosphering_speed</strong> </p></div><div className='insider'> {vehicle.max_atmosphering_speed}</div></div>


                      </div>
                    ))
                  ) : (

                    <div className="vehicle-item-unavailable" >
                      <p>No Vehicle available</p>
                    </div>
                  )}
                </div>

              </div>
              <div className="starships-section">
                <h4>Starships</h4>
                <div className="starships-container">
                  {starships.length > 0 ? (
                    starships.map((starship, index) => (
                      <div key={index} className="starships-item" style={{
                        flex: `0 0 ${starship.length === 1 ? '100%' : 'calc(50% - 10px)'}`
                      }}>
                        <h5>{starship.name}</h5>

                        <div className='items'><div className='key'><p><strong>Model</strong> </p></div><div className='insider'>{starship.model}</div></div>
                        <div className='items'><div className='key'><p><strong>Manufacturer</strong></p> </div><div className='insider'> {starship.manufacturer}</div></div>
                        <div className='items'><div className='key'><p><strong>Max_atmosphering_speed</strong> </p></div><div className='insider'> {starship.max_atmosphering_speed}</div></div>


                      </div>
                    ))
                  ) : (

                    <div className="vehicle-item-unavailable" >
                      <p>No Starships available</p>
                    </div>
                  )}
                </div>

              </div>




            </div>
            <div className='footer'></div>
          </div>

        </>
      )}
    </div>
  );
};

export default ActorDetails;
