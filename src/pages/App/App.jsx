import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import MyReservationsPage from '../MyReservationsPage/MyReservationsPage';
import AllParksPage from '../AllParksPage/AllParksPage';
import NavBar from '../../components/NavBar/NavBar';
import ParkDetailPage from '../ParkDetailPage/ParkDetailPage';
// import HomePage from '../HomePage/HomePage';
// import * as parksAPI from '../../utilities/parks-api';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/reservations" element={<MyReservationsPage user={user} />} />
              <Route path="/parks" element={<AllParksPage />} />
              <Route path="/parks/:id" element={<ParkDetailPage />} />
              {/* <Route path="/" element={<HomePage />} /> */}
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
