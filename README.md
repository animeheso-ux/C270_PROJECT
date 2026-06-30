PLEASE READ 


# Learning Quest

## Prerequisites

Make sure you have the following installed:

- Node.js (includes npm)

You can check if they're installed by running:

```bash
node -v
npm -v
```

## Installation

This project has separate frontend and backend folders. You need to install the dependencies for both.

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend-node
npm install
```

## Running the Project

### Start the Backend

```bash
cd backend-node
npm start
```

### Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend will typically be available at:

```
http://localhost:5173
```

The backend will run on the port configured in the backend project (commonly `http://localhost:3000` or `http://localhost:8000`).

## Notes

- Run `npm install` **once** in both the `frontend` and `backend-node` folders before starting the project.
- If you pull new changes that modify `package.json`, run `npm install` again in the affected folder.
