import * as reservationsAPI from '../../utilities/reservations-api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function MyReservationsPage({user}) {
  
  const [myReservations, setMyReservations] = useState(null);
  async function findMyReservations() {
    if (user._id) {
      console.log(user._id)
      const myReservation = await reservationsAPI.searchMyReservations(user._id)
    }
    
  }
  findMyReservations()
  

  return (
    <div>
      <h1>Park Reservations</h1>
      <h1>Park Reservations</h1>
      <h1>Park Reservations</h1>
      <div>{}</div>
    </div>
  );
}