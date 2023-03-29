import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import * as parksAPI from '../../utilities/parks-api'
import './ParkDetailPage.css'

export default function ParkDetailPage() {
  const [park, setPark] = useState({});
  const {id} = useParams();
  
  useEffect(() => {
    async function getDetails() {
      const parkDetail = await parksAPI.getPark(id)
      setPark(parkDetail)
      console.log(park)
    }
    getDetails()
  }, [])
  
  const [parkHoursStart, setParkHoursStart] = useState([]);
  const [parkHoursEnd, setParkHoursEnd] = useState([]);
  useEffect(() => {
    function extractHours() {
      console.log(park.hours)
      if (park.hours === '24 Hours') {
        setParkHoursStart(['24 Hours', 0])
        setParkHoursEnd(['24 Hours', 23])
      } else if (park.hours) {
        park.hours = '4:30 a.m. - 11:30 p.m.'
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
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
    days.push(date);
  }
  console.log(timeSlots, days)
  

  return (
  <>
    <div>Park Details:</div>
    <div>Name: {park.name}</div>
    <div>Hours: {park.hours}</div>
    {/* {park.feature_desc.map((f) => 
      <ul>Features: {f}<li></li></ul>
    )} */}
    <hr />
    <Container>
      <h2>Calendar</h2>
      <Row style={{ flexDirection: "row-reverse" }}>
        <Col md={8}>
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
        </Col>
        <Col md={4}>
          <div className="reservation-form px-4 py-3">
            <h3>Make a Reservation</h3>
            <Form>
              <Form.Group>
                <Form.Label>Reservation Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Reservation Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Start Time</Form.Label>
                <Form.Control type="time" />
              </Form.Group>
              <Form.Group>
                <Form.Label>End Time</Form.Label>
                <Form.Control type="time" />
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
        </Col>
      </Row>
    </Container>
  </>
  )
}