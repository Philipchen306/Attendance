import React, { useEffect, useState} from 'react';
import './Logs.css';

export default function Logs() {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/logs')
        .then(res => {
            if (!res.ok) throw new Error('Fail to fetch logs');
            return res.json();
        })
        .then(data => setLogs(data))
        .catch(err => setError(err.message));
    }, []);

function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return dateString; // fallback

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}
    return (
        <div className="logs-container">
            <h2>Log Records</h2>
            {error && <p className="error">{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Updated By</th>
                        <th>Updated Date</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td>{log.action}</td>
                            <td>{log.updatedBy}</td>
                            <td>{formatDate(log.updatedAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}