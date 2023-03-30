import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import './ParkAvailabilityCalendar.css'

export default function ParkAvailabilityCalendar({park}) {
  const [parkHoursStart, setParkHoursStart] = useState([]);
  const [parkHoursEnd, setParkHoursEnd] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const {id} = useParams();

  useEffect(() => {
    function extractHours() {
      console.log(park.hours)
      if (park.hours === '24 Hours') {
        setParkHoursStart(['24 Hours', 0])
        setParkHoursEnd(['24 Hours', 23])
      } else if (park.hours) {
        // park.hours = '4:30 a.m. - 11:30 p.m.'
        let parkOpen = park.hours.match(/(\d{1,2})(?::\d{1,2})?\s*a\.m\./);
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
  
  const now = new Date();
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + (7 * weekOffset));
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
    days.push(date);
    for (let hour = parseInt(parkHoursStart[1]); hour <= parseInt(parkHoursEnd[1]) ; hour++) {
      for (let minute of [ 0, 30 ]) {
        timeSlots.push(`${hour.toString()}:${minute.toString().padStart(2, '0')}`);
        
        //make search req to reservations db to check if the current park (parkfeature - do later) and day has any reservations, if so check the start time and end time to render reserved
      }
    }
  }
  console.log(timeSlots, days)

  return (
  <>
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
    Calendar Component here!!
  </>
  )
}