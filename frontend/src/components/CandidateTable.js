import React from 'react';
import './CandidateTable.css';

function CandidateTable({ candidates, onStatusUpdate }) {
  const handleStatusChange = (id, event) => {
    const newStatus = event.target.value;
    onStatusUpdate(id, newStatus); // Call the status update function
  };

  return (
    <table className="candidate-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Assessment Date</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate) => (
          <tr key={candidate.id}>
            <td>{candidate.name}</td>
            <td>
              <select
                value={candidate.status}
                onChange={(event) => handleStatusChange(candidate.id, event)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </td>
            <td>{new Date(candidate.assessment_date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CandidateTable;
