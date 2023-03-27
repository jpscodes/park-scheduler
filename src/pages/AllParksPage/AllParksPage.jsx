import { checkToken } from "../../utilities/users-service";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as parksAPI from '../../utilities/parks-api'


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
      {parksData2 && (
        <ul>
          {parksData2.map(park2 => (
            <div className="all-parks">
              <li>{park2.name}</li>
              <li> - {park2.feature_desc} - {park2.hours} - <Link to="/parks/details">See Details for special data</Link></li>
            </div>
          ))}
        </ul>
      )}
    </>
  );
}
