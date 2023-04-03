import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import './ParkAvailabilityCalendar.css'
import * as reservationsAPI from '../../utilities/reservations-api';

export default function ParkAvailabilityCalendar({park}) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [weekCalendar, setWeekCalendar] = useState(null);
  
  useEffect(() => { 
    console.log('offSet')
    async function renderCalendar() {
      const now = new Date();
      const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + (7 * weekOffset));
      // const startOfWeek = now.setDate(now.getDate() + (7 * weekOffset));
      const weeklyCalendar = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        const day = {date, slots: []};
        weeklyCalendar.push(day);
      }
      for (let time = park.hoursStart; time <= park.hoursEnd; time += 0.5) {
        weeklyCalendar.forEach((day) => {
          day.slots.push({time, reserved: false})
        });
      }
      const reservations = await reservationsAPI.searchReservations(park._id)
      reservations.forEach((res) => {
        weeklyCalendar.forEach((day) => {
          if ((new Date(res.reservationDate).setHours(0, 0, 0, 0,)) === new Date(new Date(day.date).toLocaleDateString()).setHours(0, 0, 0, 0,)) {
              day.slots.forEach((time) => {
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
        // console.log(weeklyCalendar, 'my correct weekCalendar')
        setWeekCalendar(weeklyCalendar)
      }
    renderCalendar()
  }, [weekOffset])
  console.log(weekCalendar, 'the weekCalendar')

  return (
  <>
    <div className="table-container">
      <h2>Calendar</h2>
      <Button style={{ backgroundColor: 'rgb(108, 148, 177)' }} onClick={() => setWeekOffset(weekOffset - 1)}>{'<'}</Button>
      <Button style={{ backgroundColor: 'rgb(108, 148, 177)' }} onClick={() => setWeekOffset(weekOffset + 1)}>{'>'}</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Time</th>
            {weekCalendar && weekCalendar.map(day => <th key={day.date}>{day.date.toDateString().slice(4, -5)}</th>)}
          </tr>
        </thead>
        <tbody>
          {weekCalendar && weekCalendar[0].slots.map((slot, index) => (
            <tr key={index}>
              <td>
                {
                  (() => {
                    let time = slot.time;
                    let hour = Math.floor(time);
                    let minutes = (time - hour) * 60;
                    let suffix = hour >= 12 ? 'PM' : 'AM';
                    hour = hour % 12 || 12;
                    let formattedTime = hour + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + suffix;
                    return formattedTime;
                  })()
                }
              </td>
              {weekCalendar.map(day => (
                <td className="reservation-boxes" key={day.date} style={{backgroundColor: day.slots[index].reserved ? '#FFC0CB' : 'rgb(108, 148, 177)'}}>
                  {day.slots[index].reserved ? 'Reserved' : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>    
  </>
  )
}