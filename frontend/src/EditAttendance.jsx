import React, { useState, useEffect } from 'react';
import './Attendance.css';

export default function EditAttendance({ record, onUpdateSuccess }) {
  const [uin, setUin] = useState('');
  const [classId, setClassId] = useState('');
  const [takenBy, setTakenBy] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  // Populate fields from the record prop when the component mounts
  useEffect(() => {
    if (record) {
      setUin(record.uin || '');
      setClassId(record.classId || '');
      setTakenBy(record.takenBy || '');
      setDate(record.date || '');
    }
  }, [record]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      action: 'edit',
      data: {
        uin,
        classId,
        takenBy,
        date
      }
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
        setMessage('Update success!');
        if (onUpdateSuccess) {
          onUpdateSuccess(); // notify parent component if needed
        }
      }
    } catch (error) {
      setMessage('Fetch error: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Attendance Record</h2>
      <form onSubmit={handleSubmit}>
        <label>UIN:</label>
        <input type="text" value={uin} onChange={(e) => setUin(e.target.value)} required />

        <label>Class ID:</label>
        <input type="text" value={classId} onChange={(e) => setClassId(e.target.value)} required />

        <label>Taken By:</label>
        <input type="text" value={takenBy} onChange={(e) => setTakenBy(e.target.value)} required />

        <label>Date:</label>
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="YYYYMMDD" required />

        <button type="submit">Update</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
