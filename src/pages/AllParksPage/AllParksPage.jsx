import { checkToken } from "../../utilities/users-service";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as parksAPI from '../../utilities/parks-api'
import './AllParksPage.css';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function AllParksPage() {
  // const [parksData, setParksData] = useState([]);
  const [parksData2, setParksData2] = useState([]);
  const [search, setSearch] = useState('')

  // async function handleCheckToken() {
  //   const expDate = await checkToken()
  //   console.log(expDate)
  // };

  async function handleSearch(evt) {
    evt.preventDefault();
    const searchResults = await parksAPI.searchAPI(search);
    setParksData2(searchResults);
  }

  return (
    <div className="body-container-for-app-parks-page">
      <form onSubmit={handleSearch}>
        <input type="text" onChange={(evt) => setSearch(evt.target.value)} value={search}/>
        <button type="submit">Search Parks</button>
      </form>
      <div className="parks-container">
        {parksData2.map(park => (
          <div key={park._id} className="park-card-container">
            <Card key={park._id} className="park-card">
              <Card.Header>
                <Card.Title>{park.name}</Card.Title>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Features: </strong>
                    <br />
                    {park.feature_desc.map((feature, index) => (
                      <span key={feature}>{feature} {index !== park.feature_desc.length - 1 && '| '} </span>
                    ))}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Hours: </strong>
                    {park.hours}
                  </ListGroup.Item>
                </ListGroup>
                <Link className="link-buttonstyle" to={`/parks/${park._id}`}>View/Schedule Here</Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
