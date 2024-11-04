# Assessment Tracking Dashboard

This project is a web application for tracking candidate assessments. It features a user-friendly dashboard to add, update, and view candidates' assessment statuses, with sorting and filtering capabilities.

## Table of Contents
- [Setup](#setup)
- [Functionality](#functionality)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Additional Notes](#additional-notes)

## Setup

### Prerequisites
- **Node.js** and **npm** installed
- **PostgreSQL** database
- **Vercel Postgres** for database management

### Backend Setup

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-name>/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables:
   - Create a `.env` file in the backend folder and add:
     ```env
     PORT=5000
     DATABASE_URL=your-vercel-postgres-url
     SECRET_KEY=your-jwt-secret
     ```

4. Start the backend server:
    ```bash
    npm start
    ```
    The backend will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend:
    ```bash
    npm start
    ```
    The frontend will run on `http://localhost:3000`.

### Database Setup

- Create a new table in your Vercel Postgres database for candidates and users.
- Make sure to use the appropriate SQL script provided in the project.

## Functionality

### Authentication
- **Login Page**: Users must log in using JWT-based authentication to access the dashboard.
- **Authorization**: Only authenticated users can view and manage candidates.

### Candidate Management
- **View Candidates**: A table displaying all candidates, their statuses, and assessment dates.
- **Add Candidate**: A modal form to add new candidates with validation.
- **Update Status**: Dropdown in the table to update a candidate's assessment status.
- **Sort and Filter**: Options to sort candidates by name, status, or assessment date.

### Pagination
- Handles large datasets with a simple pagination system.

## Technologies Used

### Frontend
- **React.js**: For building the user interface.
- **ShadCN**: For consistent and reusable UI components.
- **CSS**: For styling and ensuring mobile responsiveness.

### Backend
- **Node.js**: For the backend runtime environment.
- **Express.js**: For building the RESTful API.
- **PostgreSQL**: Database management.
- **Vercel Postgres**: Cloud-based Postgres database.
- **JWT**: For handling authentication and authorization.

## Folder Structure

```bash
/project-root
  ├── /backend
  │   ├── /models
  │   ├── /routes
  │   ├── app.js
  │   └── .env
  ├── /frontend
  │   ├── /components
  │   ├── App.js
  │   ├── index.js
  │   └── /styles
  └── README.md
