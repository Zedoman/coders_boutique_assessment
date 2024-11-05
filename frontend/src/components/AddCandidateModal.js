import React, { useState } from 'react';
import './AddCandidateModal.css';

function AddCandidateModal({ isOpen, onClose, onCandidateAdded }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const API_URL = 'https://coders-boutique-assessment.onrender.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCandidate = { name, status };
  
    try {
      const response = await fetch(`${API_URL}//api/candidates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCandidate),
      });
  
      if (response.ok) {
        const result = await response.json(); // Parse the JSON response
        console.log(result.message); // Log the success message
        onCandidateAdded(newCandidate); // Optionally, you can use 'result' if your backend sends back the added candidate data
        onClose();
      } else {
        console.error('Failed to add candidate');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Candidate</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCandidateModal;
