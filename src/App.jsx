
import React, { useState } from 'react';
import './App.css';

function App() {
  const [courses, setCourses] = useState([{ grade: '', credits: '', checked: true }]);

  const gradesToPoints = {
    'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const handleAddRow = () => {
    setCourses([...courses, { grade: '', credits: '', checked: true }]);
  };

  const handleDeleteRow = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  };

  const handleChange = (index, field, value) => {
    const updatedCourses = courses.map((course, i) =>
      i === index ? { ...course, [field]: value } : course
    );
    setCourses(updatedCourses);
  };

  const handleReset = () => {
    setCourses([{ grade: '', credits: '', checked: true }]);
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.checked && course.grade && course.credits) {
        const points = gradesToPoints[course.grade] * parseFloat(course.credits);
        totalPoints += points;
        totalCredits += parseFloat(course.credits);
      }
    });

    return totalCredits ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  return (
    <div className="container">
      <h1>GPA Calculator</h1>

      <div className="table">
        {courses.map((course, index) => (
          <div key={index} className="row">
            <input
              type="checkbox"
              checked={course.checked}
              onChange={() =>
                handleChange(index, 'checked', !course.checked)
              }
            />
            <input
              type="text"
              placeholder={`Course #${index + 1}`}
              disabled
            />
            <select
              value={course.grade}
              onChange={(e) => handleChange(index, 'grade', e.target.value)}
            >
              <option value="">--</option>
              {Object.keys(gradesToPoints).map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Credits"
              value={course.credits}
              onChange={(e) => handleChange(index, 'credits', e.target.value)}
            />
            <button onClick={() => handleDeleteRow(index)}>X</button>
          </div>
        ))}
      </div>

      <button onClick={handleAddRow}>+ Add row</button>

      <div className="buttons">
        <button onClick={() => alert(`GPA: ${calculateGPA()}`)}>= Calculate</button>
        <button onClick={handleReset}>× Reset</button>
      </div>

      <div className="gpa">
        <label>GPA:</label>
        <input type="text" value={calculateGPA()} readOnly />
      </div>
    </div>
  );
}

export default App;