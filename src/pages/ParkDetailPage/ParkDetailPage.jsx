import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import * as parksAPI from '../../utilities/parks-api';
import * as reservationsAPI from '../../utilities/reservations-api';
import './ParkDetailPage.css';

export default function ParkDetailPage() {
  const [park, setPark] = useState({});
  const [parkHoursStart, setParkHoursStart] = useState([]);
  const [parkHoursEnd, setParkHoursEnd] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [reservation, setReservation] = useState({
    name: '',
    feature_desc: 'Baseball/Softball',
    reservationDate: '',
    startHour: '',
    endHour: '',
  });
  const {id} = useParams();

  function handleChange(evt) {
    const newReservation = {...reservation, [evt.target.name]: evt.target.value}
    setReservation(newReservation)
  }
  
  async function handleSubmit(evt) {
    evt.preventDefault()
    const newReservation = {
      ...reservation, 
      park: park._id,
    }

    console.log(newReservation, 'rrrrrrrrrr')
    const r = await reservationsAPI.makeReservation(newReservation)
  }
  
  
  useEffect(() => {
    async function getDetails() {
      const parkDetail = await parksAPI.getPark(id)
      setPark(parkDetail)
      console.log(park)
    }
    getDetails()
  }, [])
  
  useEffect(() => {
    function extractHours() {
      console.log(park.hours)
      if (park.hours === '24 Hours') {
        setParkHoursStart(['24 Hours', 0])
        setParkHoursEnd(['24 Hours', 23])
      } else if (park.hours) {
        // park.hours = '4:30 a.m. - 11:30 p.m.'
        let parkOpen = park.hours.match(/(\d{1,2})(?::\d{1,2})?\s*a\.m\.|\s*p\.m\./);
        parkOpen[1] = parseInt(parkOpen[1])
        setParkHoursStart(parkOpen)
        console.log(parkHoursStart, 'park open horus');
        let parkClose = park.hours.match(/(\d{1,2})(?::\d{2})?\s*p\.m\./);
        parkClose[1] = parseInt(parkClose[1]) + 12
        console.log(parkClose, 'ttttttttttttttttttttt')
        setParkHoursEnd(parkClose)
        console.log(parkHoursEnd, 'park close horus');
      }
      console.log([parkHoursStart, parkHoursEnd], 'park hours array here')
      return (parkHoursStart, parkHoursEnd)
    }

    extractHours();
  }, [park])

  
  const timeSlots = [];
  console.log(parkHoursStart, parkHoursEnd, 'parseeerr')
  for (let hour = parseInt(parkHoursStart[1]); hour <= parseInt(parkHoursEnd[1]) ; hour++) {
    for (let minute of [ 0, 30 ]) {
      timeSlots.push(`${hour.toString()}:${minute.toString().padStart(2, '0')}`);
    }
  }

  const now = new Date();
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + (7 * weekOffset));
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
    days.push(date);
  }
  console.log(timeSlots, days)

  return (
    <>
      <div>Park Details</div>
      <div>Name: {park.name}</div>
      <div>Hours: {park.hours}</div>
      <hr />
      <div className="calendar-container">
        <div className="table-container">
          <h2>Calendar</h2>
            <Button onClick={() => setWeekOffset(weekOffset - 1)}>{'<'}</Button>
            <Button onClick={() => setWeekOffset(weekOffset + 1)}>{'>'}</Button>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Park Hours</th>
                {days.map((day, index) => (
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
          </Table>
        </div>
        <div className="form-container">
          <div className="reservation-form px-4 py-3">
            <h3>Make a Reservation</h3>
            <Form onChange={handleChange} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Reservation Name</Form.Label>
                <Form.Control name="name" type="text" placeholder="Enter Reservation Name" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Reservation Date</Form.Label>
                <Form.Control name="reservationDate" type="date" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Start Time</Form.Label>
                <Form.Control name="startHour" as="select" id="start-time">
                  <option value="default">Select Time</option>
                  {timeSlots.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>End Time</Form.Label>
                <Form.Control name="endHour" as="select" id="end-time">
                  <option value="default">Select Time</option>
                  {timeSlots.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                variant="success"
                className="btn-stadium"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}