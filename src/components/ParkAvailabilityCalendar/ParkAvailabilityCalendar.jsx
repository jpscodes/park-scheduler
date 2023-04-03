import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import './ParkAvailabilityCalendar.css'
import * as reservationsAPI from '../../utilities/reservations-api';

export default function ParkAvailabilityCalendar({park}) {
  const [parkHoursStart, setParkHoursStart] = useState([]);
  const [parkHoursEnd, setParkHoursEnd] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [weekCalendar, setWeekCalendar] = useState(null);

  useEffect(() => {
    function extractHours() {
      console.log(park, 'parkkkkccc')
      if (park.hours === '24 Hours') {
        setParkHoursStart(['24 Hours', 0])
        setParkHoursEnd(['24 Hours', 23])
        handleInitialDate(0, 23)
      } else if (park.hours) {
        let parkOpen = park.hours.match(/(\d{1,2})(?::\d{1,2})?\s*a\.m\./);
        parkOpen[1] = parseInt(parkOpen[1])
        setParkHoursStart(parkOpen[1])
        let parkClose = park.hours.match(/(\d{1,2})(?::\d{2})?\s*p\.m\./);
        parkClose[1] = parseInt(parkClose[1]) + 12
        setParkHoursEnd(parkClose[1])
        handleInitialDate(parkOpen[1], parkClose[1])
      }
      return (parkHoursStart, parkHoursEnd)
    }
    extractHours();
  }, [park])
  
  function handleInitialDate(parkHoursStart, parkHoursEnd) {
    console.log(parkHoursStart, 'start')
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
    // checkReservations(weeklyCalendar)
    // checkReservations()
    setWeekCalendar(weeklyCalendar)
  }

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
      // messing around below
      checkReservations()
      setWeekCalendar(weeklyCalendar)
      // const newCal = checkReservations()
      // setWeekCalendar(weekCalendar)
      // console.log(newCal, 'newCalkk')
    }
    renderCalendar()
  }, [weekOffset])
  
  let calLoad = null
  async function checkReservations() {
    if (park._id) {
    const reservations = await reservationsAPI.searchReservations(park._id)
    // console.log(reservations)
    reservations.forEach((res) => {
      weekCalendar.forEach((day) => {
        if ((new Date(res.reservationDate).setHours(0, 0, 0, 0,)) === new Date(new Date(day.date).toLocaleDateString()).setHours(0, 0, 0, 0,)) {
            // console.log(res, 'my res')
            // console.log(day, 'day object')
            day.slots.forEach((time) => {
              // console.log(time, 'timeeeeeeeeeeeeeeeeeee')
              if (time.time >= res.startHour && time.time < res.endHour) {
                // console.log(time.time, 'timeeee')
                // console.log(res.startHour, 'res time')
                time.reserved = true
                console.log(time, 'times altered ')
              }
            })
          }
        })
      })
      // setWeekCalendar(weekCalendar) 
      //  not working because my calendar gets rerendered 
    }
    let calLoad = weekCalendar
    console.log(calLoad, 'This is calLoad')
    console.log(weekCalendar, 'This is correct array i want rendered')
    return weekCalendar
  }
  // console.log(weekCalendar, 'This is incorrect array')
  console.log(calLoad, 'This is calLoad')
  
  return (
  <>
    <div className="table-container">
      <h2>Calendar</h2>
        <Button onClick={() => setWeekOffset(weekOffset - 1)}>{'<'}</Button>
        <Button onClick={() => setWeekOffset(weekOffset + 1)}>{'>'}</Button>
      <Table striped bordered>
        {/* <thead>
          <tr>
            <th>Park Hours</th>
            {calLoad && calLoad.map((day, index) => (
              <th key={index}>
                {day.date.toDateString().slice(4, -5)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {park && calLoad && (calLoad[0].slots.length > 1) && calLoad[0].slots.map((slot, index) => ( // assuming all days have the same slots
            <tr key={index}>
              <td>{slot.time}</td>
              {calLoad && calLoad.map((day, index) => (
                <td key={index} style={{backgroundColor: day.slots[index].reserved ? '#FFC0CB' : '#90EE90'}}>
                  {day.slots[index].reserved ? "Reserved" : "Available"}
                </td>
              ))}
            </tr>
          ))}
        </tbody> */}
        <thead>
          <tr>
            <th>Park Hours</th>
            {weekCalendar && weekCalendar.map((day, index) => (
              <th key={index}>
                {day.date.toDateString().slice(4, -5)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {park && weekCalendar && (weekCalendar[0].slots.length > 1) && weekCalendar[0].slots.map((slot, index) => ( // assuming all days have the same slots
            <tr key={index}>
              <td>{slot.time}</td>
              {weekCalendar && weekCalendar.map((day, index) => (
                <td key={index} style={{backgroundColor: day.slots[index].reserved ? '#FFC0CB' : '#90EE90'}}>
                  {day.slots[index].reserved ? "Reserved" : "Available"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>    
    Calendar Component here!!
  </>
  )
}