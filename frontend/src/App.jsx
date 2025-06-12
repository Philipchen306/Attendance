import React, { useState } from 'react';
import Attendance from './Attendance';
import EditAttendance from './EditAttendance';
import Logs from './Logs';
import './App.css';

export default function App() {
  const [page, setPage] = useState('form');

  return (
    <div className="app-container">
      <div className="nav-buttons">
        <button onClick={() => setPage('form')}>Add attendance</button>
        <button onClick={() => setPage('edit')}>Edit attendance</button>
        <button onClick={() => setPage('logs')}>View logs</button>
      </div>
      {page === 'form' && <Attendance />}
      {page === 'edit' && <EditAttendance />}
      {page === 'logs' && <Logs />}
    </div>
  )
}