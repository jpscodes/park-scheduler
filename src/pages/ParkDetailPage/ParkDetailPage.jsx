import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import * as parksAPI from '../../utilities/parks-api';
import * as reservationsAPI from '../../utilities/reservations-api';
import ParkAvailabilityCalendar from '../../components/ParkAvailabilityCalendar/ParkAvailabilityCalendar'
import './ParkDetailPage.css';

export default function ParkDetailPage(props) {
  let timeSlots = [1, 2, 3, 4, 5]
  // need help passing data to this page that's needed from my components, but do I need to make it a state vaiable
  const [park, setPark] = useState({});
  const [parkHoursStart, setParkHoursStart] = useState([]);
  const [parkHoursEnd, setParkHoursEnd] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [reservations, setReservations] = useState('');
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
    const r = await reservationsAPI.makeReservation(newReservation)
  }
  
  async function getReservations(evt) {
    evt.preventDefault();
    // need to pass in park, park feature and reservation date to get reservations applicable
    const reservationsSearch = await reservationsAPI.searchReservations(evt)
    
  }
  
  useEffect(() => {
    async function getDetails() {
      const parkDetail = await parksAPI.getPark(id)
      setPark(parkDetail)
    }
    getDetails()
  }, [])
  

  const reservableFeatures = ['Baseball/Softball', 'Flag Football', 'Football', 'Golf', 'Lacrosse', 'Lawn Bowling', 'Pickelball Court', 'Rugby', 'Soccer', 'T-Ball']
  return (
    <>
      <div>Park Details</div>
      <div>Name: {park.name}</div>
      <div>Hours: {park.hours}</div>
      {/* if park feature is equal to reservable park feature list then render link, otherwise render just name. Problem is park doesn't load right away so need to await park to be truthy or we get .map error */}
      {/* <div>Features: { park.feature_desc.map((f) => (<Link>{f}</Link>))}</div> */}
      <hr />
      <div className="calendar-container">
        <ParkAvailabilityCalendar park={park}/>
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