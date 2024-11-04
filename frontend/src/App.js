import React, { useState, useEffect } from 'react';
import CandidateTable from './components/CandidateTable';
import AddCandidateModal from './components/AddCandidateModal';
import Login from './components/Login'; // Import the Login component
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication status
  const [candidates, setCandidates] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState('name');

  useEffect(() => {
    if (isLoggedIn) {
      fetchCandidates();
    }
  }, [isLoggedIn]);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/candidates');
      const data = await response.json();
      if (Array.isArray(data)) {
        setCandidates(data);
      } else {
        console.error('Invalid data format:', data);
        setCandidates([]);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setCandidates([]); // Set to an empty array on error
    }
  };
  

  const handleAddCandidate = (newCandidate) => {
    setCandidates([...candidates, newCandidate]);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      // Make a PUT request to update the status of the candidate
      const response = await fetch(`http://localhost:5000/api/candidates/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (response.ok) {
        // Update the candidates state on success
        setCandidates((prevCandidates) =>
          prevCandidates.map((candidate) =>
            candidate.id === id ? { ...candidate, status: newStatus } : candidate
          )
        );
        console.log('Status updated successfully');
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  

  const sortCandidates = (option) => {
    const sorted = [...candidates].sort((a, b) => {
      if (option === 'name') {
        return a.name.localeCompare(b.name);
      } else if (option === 'status') {
        return a.status.localeCompare(b.status);
      } else if (option === 'assessment_date') {
        return new Date(a.assessment_date) - new Date(b.assessment_date);
      }
      return 0;
    });
    setSortOption(option);
    setCandidates(sorted);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} /> // Render Login if not logged in
      ) : (
        <>
          <header className="header">
            <h1>Assessment Tracking Dashboard</h1>
            <button onClick={() => setModalOpen(true)}>Add Candidate</button>
            <div className="sort-options">
              <label>Sort By:</label>
              <select value={sortOption} onChange={(e) => sortCandidates(e.target.value)}>
                <option value="name">Name</option>
                <option value="status">Status</option>
                <option value="assessment_date">Assessment Date</option>
              </select>
            </div>
          </header>
          <AddCandidateModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onCandidateAdded={handleAddCandidate}
          />
          <CandidateTable candidates={candidates} onStatusUpdate={handleStatusUpdate} />
        </>
      )}
    </div>
  );
}

export default App;
