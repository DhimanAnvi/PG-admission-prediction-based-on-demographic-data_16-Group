import React from 'react';
import Chart from './Chart';

const Results = ({ prediction, formData }) => {
  return (
    <div className="results-container">
      <h2>Admission Prediction Results</h2>
      <div className="prediction-result">
        <p>Your chance of admission is: <strong>{Math.round(prediction * 100)}%</strong></p>
      </div>
      
      <Chart data={formData} prediction={prediction} />
      
      <div className="input-summary">
        <h3>Your Input Summary:</h3>
        <ul>
          {Object.entries(formData).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Results;