import * as reservationsAPI from '../../utilities/reservations-api';
import * as parksAPI from '../../utilities/parks-api'
import './MyReservationsPage.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function MyReservationsPage({user}) {
  const [myReservations, setMyReservations] = useState(null);
  const [reservedParks, setReservedParks] = useState(null); 

  
  useEffect(() => {
    async function findMyReservations() {
      // if (user && user._id) {
        const reservations = await reservationsAPI.searchMyReservations(user._id);
        console.log(reservations, 'reservations')
        setMyReservations(reservations); 
      // }
    }
  
    async function getReservedParks() {
      if (myReservations) { 
        let parksArr = []
        const theReservedParks = []
        myReservations.map((res) => {
          // console.log(res.park)
          if (!parksArr.includes(res.park)) {
            parksArr.push(res.park);
          }
          console.log(parksArr, 'park id  array')
          parksArr.forEach(async (parkId) => {
            const searchResults = await parksAPI.getPark(parkId);
            console.log(searchResults.name, 'searchResults.name')
            if (!theReservedParks.includes(searchResults.name)) {
              // theReservedParks.push(searchResults.name);
              theReservedParks.push(searchResults)
              console.log([...theReservedParks], 'parks returned form search')
              setReservedParks([...theReservedParks]);
            }
          })
        })
      }
    }
    
    findMyReservations(); 
    getReservedParks(); 
  }, []);

  async function handleDelete(reservationId) {
    console.log(reservationId, 'reservationId')
    try {
      const deleter = await reservationsAPI.deleteMyReservation(reservationId);
      setMyReservations(myReservations.filter(reservation => reservation._id !== reservationId));
    } catch (error) {
      console.error('Failed to delete reservation', error);
    }
  }

  const formatTime = (time) => {
    console.log(time)
    let hour = Math.floor(time);
    let minutes = (time - hour) * 60;
    let suffix = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    let formattedTime = hour + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + suffix;
    return formattedTime;
  };

  return (
    <div>
      <div>
        <h1>My Reservations</h1>
        <ul>
          {myReservations && myReservations.map((reservation) => {
            // const park = reservedParks && reservedParks.find((p) => p._id === reservation.park);
            return (
              <div className="reservation-item" key={reservation._id}>
                <p className="reservation-name">Reservation Name: {reservation.name}</p>
                <p className="reservation-name">Reservation Date: {reservation.reservationDate.slice(0, 10)}</p>
                <p className="reservation-time">Reservation Time: {formatTime(reservation.startHour)} - {formatTime(reservation.endHour)}</p>                <p className="park-name">Park Name: {reservation.park.name}</p>  
                <button className="delete-button" onClick={() => handleDelete(reservation._id)} >Delete</button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}