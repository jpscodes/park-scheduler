import { checkToken } from "../../utilities/users-service";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';

export default function AllParksPage() {
  // const [parksData, setParksData] = useState([]);
  const [parksData2, setParksData2] = useState([]);
  
  async function handleCheckToken() {
    const expDate = await checkToken()
    console.log(expDate)
  };

  const options = {
    keys: ['name', 'feature_desc'],
    includeScore: true,
    threshold: 0.4
  };

  async function handleSearch(evt) {
    evt.preventDefault();

    // const response = await fetch(`https://data.seattle.gov/resource/2cer-njie.json`)
    // const data = await response.json();
    // const fuse = new Fuse(data, options);
    // const results = fuse.search(evt.target[0].value);
    // console.log(results, 'the results before sorting')
    // const matchedParks = results.map((result) => result.item);
    // console.log(matchedParks)
    // setParksData(matchedParks);
    // setParksData(data);
    
    
    const response2 = await fetch(`https://data.seattle.gov/resource/j9km-ydkc.json`)
    const data2 = await response2.json();
    const fuse2 = new Fuse(data2, options);
    const results2 = fuse2.search(evt.target[0].value);
    const matchedParks2 = results2.map((result2) => result2.item);
    setParksData2(matchedParks2);
  }

  

  
  

  return (
    <>
      <h1>AllParksPage</h1>
      <button onClick={handleCheckToken}>Check When My Login Expires</button> 
      <form onSubmit={handleSearch}>
        <input type="text" />
        <button type="submit">Search Parks</button>
      </form>
      {/* {parksData && (
        <ul>
          {parksData.map(park => (
            <div>
              <li>{park.name} - {park.feature_desc} - <Link to="/parks/details">See Deets</Link></li>
            </div>
          ))}
        </ul>
      )} */}
      {parksData2 && (
        <ul>
          {parksData2.map(park2 => (
            <div>
              <li>{park2.name} - {park2.feature_desc} - {park2.hours} - <Link parks={parksData2} to="/parks/details">See Details for special data</Link></li>
            </div>
          ))}
        </ul>
      )}
    </>
  );
}
