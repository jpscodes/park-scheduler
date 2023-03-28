import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Table } from 'react-bootstrap';
import * as parksAPI from '../../utilities/parks-api'

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
  
  
  useEffect(() => {
    function extractHours() {
      console.log(park.hours)
      if (park.hours === '24 Hours') {
        
      }
      if (park.hours) {
        const parkHoursStart = park.hours.match(/(\d{1,2})(?=:00|\:30)?\s*a\.m\./);
        console.log(parkHoursStart, 'parj horus');
      }
    }

    extractHours();
  }, [park])

  
  
  const timeSlots = [];
  for (let hour = 6; hour <= 23; hour++) {
    for (let minute of [ 0 ]) {
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

  return (
    <>
      <div>Park Details:</div> 
      <div>Name: {park.name}</div> 
      <div>Hours: {park.hours}</div>
      <hr/>
      <Container>
        <h2>Calendar</h2>
        <Row>
          <Col>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Park Hours</th>
                  {days.map((day, index) => (
                   <th key={index}>{day.toDateString().slice(4, -5)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, index) => (
                  <tr key={index}>
                    <td>{slot}</td>
                    {days.map((day, index) => (
                      <td key={index} style={{backgroundColor: 'tan'}}>
                        Available
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}