const API_URL = 'https://coders-boutique-assessment.onrender.com';

export const fetchCandidates = async () => {
  const response = await fetch(`${API_URL}/candidates`);
  return response.json();
};

export const addCandidate = async (candidate) => {
  const response = await fetch(`${API_URL}/candidates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(candidate),
  });
  return response.json();
};
