import React, { useState } from 'react';
import './personalInfo.css';
import charmingwomen from '../charming-women.jpg'; // Ensure path is correct

function PersonalInfo({ onNext }) {
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    state: ''
  });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    onNext(info); // pass info to parent
  };

  return (
    <div 
      className="personal-info-page"
      style={{ backgroundImage: `url(${charmingwomen})` }}
    >
      <div className="overlay" />
      <div className="info-box">
        <h2>Post-Graduate Admission Predictor</h2>
        <p>Enter your personal information</p>
        <ul className="benefits-list">
    <li>✅ 1-on-1 CALL/CHAT SUPPORT</li>
    <li>✅ Personalized Choice filling</li>
    <li>✅ Certificate & Scholarships doubts</li>
    <li>✅ We will provide you the best colleges</li>
  </ul>


<div className="form-group">
  <label className="left-label">
    Name <span className="required">*</span>
  </label>
  <div className="form-row name-fields">
    <input 
      className="half-width" 
      name="firstName" 
      placeholder="First Name" 
      onChange={handleChange}
      required 
    />
    <input 
      className="half-width" 
      name="lastName" 
      placeholder="Last Name" 
      onChange={handleChange} 
      required
    />
  </div>
</div>

        <div className="form-group">
          <label>
            Phone <span className="required">*</span>
          </label>
          <input 
            name="phone" 
            placeholder="Phone" 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="form-group">
          <label>
            Email <span className="required">*</span>
          </label>
          <input 
            name="email" 
            placeholder="Email" 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="form-group">
  <label>
    State <span className="required">*</span>
  </label>
  <select name="state" onChange={handleChange} defaultValue="">
    <option value="" disabled>Select a State</option>
    <option value="NY">Delhi</option>
    <option value="CA">Chandigarh</option>
    <option value="TX">Haryana</option>
    {/* Add more states */}
  </select>
</div>


        <button className="submit-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default PersonalInfo;