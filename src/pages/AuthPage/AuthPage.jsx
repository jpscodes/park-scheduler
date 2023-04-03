import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css'

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main class="Auth-form">
      <div class="Auth-content">
        <h1>AuthPage</h1>
        <button onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>
        <div class="form-sht">
          { showSignUp ?
              <SignUpForm setUser={setUser} />
              :
              <LoginForm setUser={setUser} />
          }
        </div>
      </div>
    </main>
  );
}