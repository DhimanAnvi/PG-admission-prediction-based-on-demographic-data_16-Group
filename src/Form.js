import React, { useState } from "react";
import "./App.css";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    greScore: "",
    toeflScore: "",
    universityRating: "",
    sop: "",
    lor: "",
    cgpa: "",
    research: false,
  });

  const [admissionChance, setAdmissionChance] = useState(null);
  const [interpretation, setInterpretation] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setAdmissionChance(null);
    setInterpretation("");

    const gre = Number(formData.greScore);
    const toefl = Number(formData.toeflScore);
    const universityRating = Number(formData.universityRating);
    const sop = Number(formData.sop);
    const lor = Number(formData.lor);
    const cgpa = Number(formData.cgpa);
    const research = formData.research;

    // Validate
    if (gre < 260 || gre > 340) {
      setError("GRE must be between 260-340");
      return;
    }
    if (toefl < 60 || toefl > 120) {
      setError("TOEFL must be between 60-120");
      return;
    }
    if (universityRating < 1 || universityRating > 5) {
      setError("University rating must be 1-5");
      return;
    }
    if (sop < 1 || sop > 5) {
      setError("SOP rating must be 1-5");
      return;
    }
    if (lor < 1 || lor > 5) {
      setError("LOR rating must be 1-5");
      return;
    }
    if (cgpa < 5 || cgpa > 10) {
      setError("CGPA must be between 5-10");
      return;
    }

    const payload = {
      greScore: gre,
      toeflScore: toefl,
      universityRating,
      sop,
      lor,
      cgpa,
      research,
    };

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && !data.error) {
        setAdmissionChance(data.percent);
        setInterpretation(data.interpretation);
      } else {
        setError(data.message || (data.messages || []).join(", ") || "Prediction failed");
      }
    } catch (err) {
      setError("Error connecting to server: " + err.message);
    }
  };

  return (
    <div className="admission-container">
      <h1>University Admission Predictor</h1>
      <form onSubmit={handleSubmit} className="admission-form">
        <div className="form-group">
          <label htmlFor="greScore">GRE Score (260-340)</label>
          <input
            type="number"
            id="greScore"
            name="greScore"
            value={formData.greScore}
            onChange={handleChange}
            min="260"
            max="340"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="toeflScore">TOEFL Score (60-120)</label>
          <input
            type="number"
            id="toeflScore"
            name="toeflScore"
            value={formData.toeflScore}
            onChange={handleChange}
            min="60"
            max="120"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="universityRating">University Rating (1-5)</label>
          <input
            type="number"
            id="universityRating"
            name="universityRating"
            value={formData.universityRating}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sop">Statement of Purpose (1-5)</label>
          <input
            type="number"
            id="sop"
            name="sop"
            value={formData.sop}
            onChange={handleChange}
            min="1"
            max="5"
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lor">Letter of Recommendation (1-5)</label>
          <input
            type="number"
            id="lor"
            name="lor"
            value={formData.lor}
            onChange={handleChange}
            min="1"
            max="5"
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cgpa">CGPA (5-10)</label>
          <input
            type="number"
            id="cgpa"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleChange}
            min="5"
            max="10"
            step="0.1"
            required
          />
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="research"
              checked={formData.research}
              onChange={handleChange}
            />
            Research Experience
          </label>
        </div>

        <button type="submit" className="submit-btn">
          Predict Admission Chance
        </button>

        {error && <div className="error-message">{error}</div>}

        {admissionChance && (
          <div className="result">
            <h3>Admission Prediction Result</h3>
            <div className="chance">
              Estimated chance: <strong>{admissionChance}%</strong>
            </div>
            <div className="interpretation">{interpretation}</div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AdmissionForm;
