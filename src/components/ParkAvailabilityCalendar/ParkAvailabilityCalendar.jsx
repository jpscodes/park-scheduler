import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import './ParkAvailabilityCalendar.css'
import * as reservationsAPI from '../../utilities/reservations-api';

export default function ParkAvailabilityCalendar({park}) {
  const [parkHoursStart, setParkHoursStart] = useState([]);
  const [parkHoursEnd, setParkHoursEnd] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [weekCalendar, setWeekCalendar] = useState([]);

  useEffect(() => {
    function extractHours() {
      if (park.hours === '24 Hours') {
        setParkHoursStart(['24 Hours', 0])
        setParkHoursEnd(['24 Hours', 23])
      } else if (park.hours) {
        let parkOpen = park.hours.match(/(\d{1,2})(?::\d{1,2})?\s*a\.m\./);
        parkOpen[1] = parseInt(parkOpen[1])
        setParkHoursStart(parkOpen[1])
        let parkClose = park.hours.match(/(\d{1,2})(?::\d{2})?\s*p\.m\./);
        parkClose[1] = parseInt(parkClose[1]) + 12
        setParkHoursEnd(parkClose[1])
      }
      return (parkHoursStart, parkHoursEnd)
    }

    extractHours();
  }, [park])
  
  useEffect(() => { 
    async function renderCalendar() {
      const now = new Date();
      const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + (7 * weekOffset));
      const weeklyCalendar = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        const day = {date, slots: []};
        weeklyCalendar.push(day);
      }
      for (let time = parkHoursStart; time <= parkHoursEnd; time += 0.5) {
        weeklyCalendar.forEach((day) => {
          day.slots.push({time, reserved: false})
        });
      }
      console.log(park._id)
      const reservations = await reservationsAPI.searchReservations(park._id)
      console.log(reservations)
      // will iterate through documents to find right day, find first object that matches start time and set to reserved true until we get to end time in while (time is <= end time of reservation) loop and set reserved to true 
      // const compareReservation = reservationsAPI.searchReservations() ??
      setWeekCalendar(weeklyCalendar)
    }
    renderCalendar()
  }, [weekOffset])
  console.log(weekCalendar)


  // async function getReservations(evt) {
  //   evt.preventDefault();
  //   // need to pass in park, park feature and reservation date to get reservations applicable
  //   const reservationsSearch = await reservationsAPI.searchReservations(evt)
    
  // }

  //make search req to reservations db to check if the current park (parkfeature - do later) and day has any reservations, if so check the start time and end time to render reserved
  // console.log(timeSlots, days)
  // const weeklyCalendar = [{date: '1st day', slots: [{time: 9.5, reserved: false}, {time: 9.5, reserved: false}, {addmore: '...'} ]}, {date: '2nd day', slots: [{time: 9.5, reserved: false}, {time: 9.5, reserved: false}, {addmore: '...'} ]}]
  
  return (
  <>
    <div className="table-container">
      <h2>Calendar</h2>
        <Button onClick={() => setWeekOffset(weekOffset - 1)}>{'<'}</Button>
        <Button onClick={() => setWeekOffset(weekOffset + 1)}>{'>'}</Button>
      {/* <Table striped bordered>
        <thead>
          <tr>
            <th>Park Hours</th>
            {weekCalendar.map((day, index) => (
              <th key={index}>
                {day.toDateString().slice(4, -5)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody> 
          {timeSlots.map((slot, index) => (
            <tr key={index}>
              <td>{slot}</td>
              {days.map((day, index) => (
                <td key={index} style={{ backgroundColor: "tan" }}>
                  Available
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table> */}
    </div>    
    Calendar Component here!!
  </>
  )
}