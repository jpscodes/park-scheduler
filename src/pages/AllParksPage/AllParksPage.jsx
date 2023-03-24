import { checkToken } from "../../utilities/users-service";
import { useState, useEffect } from 'react';

export default function AllParksPage() {
  const [parksData, setParksData] = useState([]);
  
  async function handleCheckToken() {
    const expDate = await checkToken()
    console.log(expDate)
  };
  

  async function handleSubmit(evt) {
    evt.preventDefault();
    const response = await fetch('https://data.seattle.gov/resource/2cer-njie.json');
    const data = await response.json();
    setParksData(data);
  }

  return (
    <>
      <h1>AllParksPage</h1>
      <button onClick={handleCheckToken}>Check When My Login Expires</button> 
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">Search Parks</button>
      </form>
      {parksData && (
        <ul>
          {parksData.map(park => (
            <li>{park.name}</li>
          ))}
        </ul>
        )}
    </>
  );
}
