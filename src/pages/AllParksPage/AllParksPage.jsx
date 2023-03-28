import { checkToken } from "../../utilities/users-service";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as parksAPI from '../../utilities/parks-api'
import './AllParksPage.css';
import { Card, ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function AllParksPage() {
  // const [parksData, setParksData] = useState([]);
  const [parksData2, setParksData2] = useState([]);
  const [search, setSearch] = useState('')

  async function handleCheckToken() {
    const expDate = await checkToken()
    console.log(expDate)
  };

  async function handleSearch(evt) {
    evt.preventDefault();
    const searchResults = await parksAPI.searchAPI(search);
    setParksData2(searchResults);
  }

  return (
    <>
      <h1>AllParksPage</h1>
      <button onClick={handleCheckToken}>Check When My Login Expires</button> 
      <form onSubmit={handleSearch}>
        <input type="text" onChange={(evt) => setSearch(evt.target.value)} value={search}/>
        <button type="submit">Search Parks</button>
      </form>
      <div className="parks-container">
      {parksData2.map(park => (
          <Card key={park._id} className="park-card">
            <Card.Header>
              <Card.Title>{park.name}</Card.Title>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Features: </strong>
                  <br />
                  {park.feature_desc.map(feature => (
                    <span key={feature}>{feature} | </span>
                  ))}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Hours: </strong>
                  {park.hours}
                </ListGroup.Item>
              </ListGroup>
              {/* <Link to={`/parks/${park._id}`}>Details</Link> */}
              {console.log(park, 'the park object')}
              <Link to={{pathname: `/parks/${park._id}`, state: {park}}}>Details</Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}
