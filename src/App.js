import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SleepTracker from './components/SleepTracker.js';

function App() {
  const [water, setWater] = useState('');
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [steps, setSteps] = useState('');
  const [hours, setHours] = useState('');
  const [entries, setEntries] = useState([]);
  const [stepsData, setStepsData] = useState([]);
  const [hoursData, setHoursData] = useState([]);
  const [sleepData, setSleepData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const addData = () => {
    if (water && exercise && weight && steps && hours) {
      const newEntry = {
        date: new Date().toLocaleDateString(),
        water,
        exercise,
        weight,
        steps,
        hours,
      };
      setEntries([...entries, newEntry]);
      setStepsData([...stepsData, { date: new Date().toLocaleDateString(), steps }]);
      setHoursData([...hoursData, { date: new Date().toLocaleDateString(), hours }]);
      clearInputs();
    } else {
      alert('Please fill in all fields');
    }
  };

  const deleteRow = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
    setStepsData(stepsData.filter((_, i) => i !== index));
    setHoursData(hoursData.filter((_, i) => i !== index));
  };

  const startEditRow = (index) => {
    const entry = entries[index];
    setWater(entry.water);
    setExercise(entry.exercise);
    setWeight(entry.weight);
    setSteps(entry.steps);
    setHours(entry.hours);
    setEditingIndex(index);
  };

  const updateEntry = () => {
    const updatedEntries = entries.map((entry, index) =>
      index === editingIndex
        ? { ...entry, water, exercise, weight, steps, hours }
        : entry
    );
    setEntries(updatedEntries);
    setStepsData(updatedEntries.map(entry => ({ date: entry.date, steps: entry.steps })));
    setHoursData(updatedEntries.map(entry => ({ date: entry.date, hours: entry.hours })));
    cancelEdit();
  };

  const cancelEdit = () => {
    clearInputs();
    setEditingIndex(-1);
  };

  const clearInputs = () => {
    setWater('');
    setExercise('');
    setWeight('');
    setSteps('');
    setHours('');
  };

  const stepsChartData = {
    labels: stepsData.map(data => data.date),
    datasets: [
      {
        label: 'Steps Walked',
        data: stepsData.map(data => data.steps),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const hoursChartData = {
    labels: hoursData.map(data => data.date),
    datasets: [
      {
        label: 'Hours of Workout',
        data: hoursData.map(data => data.hours),
        fill: false,
        backgroundColor: 'rgba(153,102,255,0.6)',
        borderColor: 'rgba(153,102,255,1)',
      },
    ],
  };

  const onAddSleep = ({ date, hours }) => {
    const newSleepEntry = {
      date,
      hours,
    };
    setSleepData([...sleepData, newSleepEntry]);
  };

  return (
    <div className="App">
      <header>
        <div className="logo">
          <i className="fa-solid fa-bars"></i> Fitness Tracker
        </div>
        <div className="user-profile">
          <p>
            <i className="fa-solid fa-user"></i> Welcome Back to Your Fitness Tracker
          </p>
        </div>
        <div className="icons">
          <p>
            <i className="fa-solid fa-sliders"></i> Settings
          </p>
          <p>
            <i className="fa-solid fa-bell"></i> Notifications
          </p>
        </div>
      </header>

      <main>
        <section className="health-tracker-app">
          <div className="app">
            <h2>
              <i className="fa-solid fa-chart-simple"></i> Weekly Activity Insights
            </h2>
            <div className="inputs">
              <div>
                <label htmlFor="water">Water Intake (in ml)</label>
                <input
                  id="water"
                  type="number"
                  value={water}
                  onChange={(e) => setWater(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="exercise">Exercise Duration (in min)</label>
                <input
                  id="exercise"
                  type="number"
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="weight">Weight (in kg)</label>
                <input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="steps">Steps Walked</label>
                <input
                  id="steps"
                  type="number"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="hours">Hours of Workout</label>
                <input
                  id="hours"
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </div>
            </div>
            <button onClick={addData}>Submit</button>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Water Intake (in ml)</th>
                  <th>Exercise Duration (in min)</th>
                  <th>Weight (in kg)</th>
                  <th>Steps Walked</th>
                  <th>Hours of Workout</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.water}</td>
                    <td>{entry.exercise}</td>
                    <td>{entry.weight}</td>
                    <td>{entry.steps}</td>
                    <td>{entry.hours}</td>
                    <td>
                      <button onClick={() => startEditRow(index)}>Edit</button>
                    </td>
                    <td>
                      <button className="delete-btn" onClick={() => deleteRow(index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="charts">
          <div className="chart-container">
            <h3>Steps Walked Over Time</h3>
            <Line data={stepsChartData} />
          </div>
          <div className="chart-container">
            <h3>Hours of Workout Over Time</h3>
            <Line data={hoursChartData} />
          </div>
        </section>

        <section className="summary-cards">
          <SummaryCard title="Steps Today" value="10,000 / 15,000" progress="67% achieved" />
          <SummaryCard title="Calories Burned" value="500" progress="33% achieved" />
          <SummaryCard title="Active Minutes" value="60 / 120" progress="50% achieved" />
          <SummaryCard title="Distance" value="5.2 km" progress="35% achieved" />
        </section>

        <section className="tips-recommendations">
          <div className="tips">
            <h2>
              <i className="fa-solid fa-person-walking"></i> Health Tips
            </h2>
            <p id="tip-of-the-day">Tip of the day: Practice deep breathing exercises to reduce stress and improve relaxation.</p>
            <p>Remember to get 7-9 hours of quality sleep each night to support overall health and well-being.</p>
          </div>
          <div className="workout-suggestions">
            <h2>
              <i className="fa-solid fa-dumbbell"></i> Workout Suggestions
            </h2>
            <p>Suggested workout: Try a 15-minute yoga routine to increase flexibility and enhance mindfulness.</p>
            <p>Engage in a 20-minute bodyweight circuit training session for a full-body workout at home.</p>
          </div>
        </section>
        <section className="sleep-tracker">
          <h2>
            <i className="fa-solid fa-moon"></i> Sleep Tracker
          </h2>
          <SleepTracker onAddSleep={onAddSleep} />
        </section>

        <section className="activity-insights">
          <h2>
            <i className="fa-solid fa-chart-simple"></i> Weekly Activity Insights
          </h2>
          <div className="chart">
            <img src="week.jpg" alt="Weekly Activity Chart" />
          </div>
        </section>

        
      </main>
    </div>
  );
}

function SummaryCard({ title, value, progress }) {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <h3>{title}</h3>
          <p>{value}</p>
        </div>
        <div className="card-back">
          <h3>{title}</h3>
          <p>{progress}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
