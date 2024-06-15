import React, { useState } from 'react';
import './SleepTracker.css';

const SleepTracker = ({ onAddSleep }) => {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !hours) {
      alert('Please fill in both fields');
      return;
    }
    onAddSleep({ date, hours });
    setDate('');
    setHours('');
  };

  return (
    <section className="section">
      
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Hours of Sleep</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="primary">
          Add Sleep
        </button>
      </form>
    </section>
  );
};

export default SleepTracker;
