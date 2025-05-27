import React, { useState, useEffect } from 'react';
import PersonalInfo from './component/Personalinfo';
import Form from './Form';
import Results from './Results';
import './App.css';

function App() {
  const [step, setStep] = useState(1); // 1 = Personal Info, 2 = Form, 3 = Results
  const [personalInfo, setPersonalInfo] = useState(null);
  const [formData, setFormData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handlePersonalInfoNext = (info) => {
    setPersonalInfo(info);
    setStep(2);
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    setFormData(data);

    try {
      const response = await fetch('http://localhost:8080/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setPrediction(result.prediction);
      setStep(3);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPersonalInfo = () => {
    setStep(1);
  };

  const handleBackToForm = () => {
    setPrediction(null);
    setStep(2);
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
    <div className="app">
      {/* 🌙 Icon-only Dark Mode toggle (not shown on first page) */}
      {step !== 1 && (
        <div className="toggle-container">
          <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
            {darkMode ? '🌙' : '☀️'}
          </button>
        </div>
      )}

      {/* ← Default back arrow icon shown on Step 2 and Step 3 */}
      {step > 1 && (
        <button 
          className="back-icon-btn" 
          onClick={step === 2 ? handleBackToPersonalInfo : handleBackToForm}
        >
          ←
        </button>
      )}

      {/* Main Steps */}
      {step === 1 && <PersonalInfo onNext={handlePersonalInfoNext} />}
      {step === 2 && !prediction && <Form onSubmit={handleSubmit} />}
      {step === 3 && prediction && <Results prediction={prediction} formData={formData} />}
      
      {loading && <div className="loader">Calculating...</div>}
    </div>
  );
}

export default App;