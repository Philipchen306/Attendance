import React, { useState } from 'react';
import './Attendance.css';

export default function Attendance() {
  const [uin, setUin] = useState('');
  const [classId, setClassId] = useState('');
  const [takenBy, setTakenBy] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      action: 'insert',
      data: { uin, classId, takenBy, date }
    };

    try {
      const res = await fetch('http://localhost:8080/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage('Error: ' + (errorData.error || res.statusText));
      } else {
        const result = await res.json();
        setMessage('Success! ID: ' + result._id);
        setUin('');
        setClassId('');
        setTakenBy('');
        setDate('');
      }
    } catch (error) {
      setMessage('Fetch error: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Insert New Attendance Record</h2>
      <form onSubmit={handleSubmit}>
        <label>UIN:</label>
        <input type="text" value={uin} onChange={(e) => setUin(e.target.value)} required />

        <label>Class ID:</label>
        <input type="text" value={classId} onChange={(e) => setClassId(e.target.value)} required />

        <label>Taken By:</label>
        <input type="text" value={takenBy} onChange={(e) => setTakenBy(e.target.value)} required />

        <label>Date:</label>
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="YYYYMMDD" required />

        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}