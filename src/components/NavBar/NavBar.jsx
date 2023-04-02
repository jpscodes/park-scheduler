import { Link } from 'react-router-dom';
import './NavBar.css'
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className='navbar'>
      <div className="left-items">
        <Link to="/">Home</Link>
        <Link to="/parks">All Parks</Link>
      </div>
      <div className="right-items">
        <Link to="/parks/details">My Reservations</Link>
        <Link to="" onClick={handleLogOut}>Log Out</Link>
        <span>Welcome, {user.name}</span>
      </div>
    </nav>
  );
}