require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const cors = require('cors');
const candidateRoutes = require('./routes/candidateRoutes');
const loginAdmin = require('./routes/authroutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/candidates', candidateRoutes);
app.use('/api', loginAdmin)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
