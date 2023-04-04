import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './HomePage.css';
import NavBar from '../../components/NavBar/NavBar';

export default function HomePage() {
  

  return (
    <main className="home-page-main">
      <div className='inspire-search'>Explore what Seattle Parks has to offer</div>
      <a href="/parks"><button className='begin-your-journey'>Begin Your Journey</button></a>
    </main>
  );
}
