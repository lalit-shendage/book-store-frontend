import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleBusinessNameChange = (e) => {
    setName(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }
      
      await signUp(email, password, name);
      console.log('User signed up successfully!');
      
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="container">
  <div className="signup-form">
    <h2>Sign Up</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Name" value={name} onChange={handleBusinessNameChange} />
      </div>
      <div className="form-group">
        <input type="email" className="form-control" placeholder="Email" value={email} onChange={handleEmailChange} />
      </div>
      <div className="form-group">
        <input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePasswordChange} />
      </div>
      <div className="form-group">
        <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </div>
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
  </div>
</div>

  );
};

export default SignUp;
