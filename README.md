# A Serious Project

## Prerequisites
- Docker installed on your machine

## Local Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/xying0613/a-serious-project.git
   ```
2. Navigate to the project folder and set up environment variables:
Copy `.env.sample` to `.env` and `.env.prod` for different environments in both backend and frontend folders.

## Running the Project
<b>Option 1: Run Backend and Frontend Together</b>
```bash
docker-compose -f docker-compose.local.yml up -d --build
```

<b>Option 2: Run Backend and Frontend Separately</b>
- Backend
    1. Navigate to the `backend` folder
    2. Start the backend server
        ```bash
        node index.js
        ```
    3. Access the backend at http://localhost:3000.
<br><br>
- Frontend
    1. Navigate to the `frontend` folder
    2. Start the frontend server
        ```bash
        npm run dev
        ```
    3. Access the backend at http://localhost:3000.

