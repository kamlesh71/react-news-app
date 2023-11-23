# README.md

## Prerequisites

Before running the application, ensure you have Docker installed on your system.

## Building and Running the Application

1. **Update Endpoint (Optional)**: If required, update the endpoint URL in the `src/bootstrap.ts` file on line number 5.
   ```bash
   axios.defaults.baseURL = 'http://localhost';
2. **Build and Run Docker:**

   ```bash
   docker-compose up --build
3. **Once the application is running, it should be accessible on:**

   ```bash
   http://localhost:8000