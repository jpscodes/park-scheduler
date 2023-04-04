import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import * as parksAPI from '../../utilities/parks-api';
import * as reservationsAPI from '../../utilities/reservations-api';
import ParkAvailabilityCalendar from '../../components/ParkAvailabilityCalendar/ParkAvailabilityCalendar'
import './ParkDetailPage.css';
import NavBar from '../../components/NavBar/NavBar';

export default function ParkDetailPage(props) {
  const [timeSlots, setTimeSlots] = useState([]);
  const [park, setPark] = useState(null);
  const [reservation, setReservation] = useState({
    name: '',
    feature_desc: 'Baseball/Softball',
    reservationDate: '',
    startHour: '',
    endHour: '',
  });
  const {id} = useParams();

  useEffect(() => {
    async function getDetails() {
      const park = await parksAPI.getPark(id)
      if (park.hours === '24 Hours') {
        park.hoursStart = ['24 Hours', 0];
        park.hoursEnd = ['24 Hours', 23];
      } else if (park.hours) {
        let parkOpen = park.hours.match(/(\d{1,2})(?::\d{1,2})?\s*a\.m\./);
        park.hoursStart = parseInt(parkOpen[1])
        let parkClose = park.hours.match(/(\d{1,2})(?::\d{2})?\s*p\.m\./);
        park.hoursEnd = parseInt(parkClose[1]) + 12
      }
      let times = []
      for (let time = park.hoursStart; time < park.hoursEnd; time += 0.5) {
        times.push(time)
      }
      setTimeSlots(times)
      setPark(park)
    }
    getDetails()
  }, [])

  if (!park) return null

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
    const r = await reservationsAPI.makeReservation(newReservation)
  }
  
  
  const reservableFeatures = ['Baseball/Softball', 'Flag Football', 'Football', 'Golf', 'Lacrosse', 'Lawn Bowling', 'Pickelball Court', 'Rugby', 'Soccer', 'T-Ball']
  return (
    <>
      <div className="park-detail-name">{park.name}</div>
      <div>Hours: {park.hours}</div>
      {/* if park feature is equal to reservable park feature list then render link, otherwise render just name. Problem is park doesn't load right away so need to await park to be truthy or we get .map error */}
      <div className="park-feature-list">Features: { park.feature_desc.map((f, index) => (<Button key={index} className="park-feature-list-button">{f}</Button>))}</div>
      <hr />
      <div className="calendar-container">
        <ParkAvailabilityCalendar park={park}/>
        <div className="form-container">
          <div className="reservation-form px-4 py-3">
            <h3>Make a Reservation</h3>
            <Form onChange={handleChange} onSubmit={handleSubmit} className="form-box">
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
                  {timeSlots.map((time, index) => {
                    let hour = Math.floor(time);
                    let minutes = (time - hour) * 60;
                    let suffix = hour >= 12 ? 'PM' : 'AM';
                    hour = hour % 12 || 12;
                    let formattedTime = hour + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + suffix;
                    return <option key={index} value={time}>{formattedTime}</option>;
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>End Time</Form.Label>
                <Form.Control name="endHour" as="select" id="end-time">
                  <option value="default">Select Time</option>
                  {timeSlots.map((time, index) => {
                    let hour = Math.floor(time);
                    let minutes = (time - hour) * 60;
                    let suffix = hour >= 12 ? 'PM' : 'AM';
                    hour = hour % 12 || 12;
                    let formattedTime = hour + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + suffix;
                    return <option key={index} value={time}>{formattedTime}</option>;
                  })}
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