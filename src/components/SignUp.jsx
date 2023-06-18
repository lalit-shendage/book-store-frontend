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
    <div className="container mt-4" style={{ maxWidth: '400px' }}>
      <h2 >Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 " >
          <label className="form-label"> Name:</label>
          <input type="text" className="form-control" value={name} onChange={handleBusinessNameChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" className="form-control" value={email} onChange={handleEmailChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input type="password" className="form-control" value={password} onChange={handlePasswordChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password:</label>
          <input type="password" className="form-control" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
     
    </div>
  );
};

export default SignUp;
