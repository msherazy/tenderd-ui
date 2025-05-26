# Tenderd Fleet Management Dashboard

A comprehensive fleet management web application built with React + TypeScript + Vite, designed for tracking and managing vehicles, maintenance schedules, and fleet status.

## Features

- Vehicle inventory management and tracking
- Detailed vehicle information display
- Vehicle status monitoring with visual indicators
- Maintenance scheduling and history tracking
- Sortable and filterable vehicle lists
- Responsive design for desktop and mobile use
- User-friendly interface with modern UI components

## Technologies Used

- **React 19**: Latest version of the React library for building user interfaces
- **TypeScript**: Type safety for more reliable code
- **Vite**: Modern build tool for faster development experience
- **TanStack Router**: Typesafe routing for React applications
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **Axios**: Promise-based HTTP client for API requests
- **Recharts**: Composable charting library for data visualization
- **Jest**: Testing framework for unit and component tests
- **Docker**: Containerization for consistent development and deployment

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/msherazy/tenderd-ui.git
   cd tenderd-ui
   ```

2. Install dependencies:
   
   Using yarn:
   ```sh
   yarn install
   ```
   
   Or using npm:
   ```sh
   npm install
   ```
   
3. Create a `.env` file in the root directory and add the necessary environment variables.

4. Start the development server:

   Using yarn:
   ```sh
   yarn dev
   ```
   
   Or using npm:
   ```sh
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

## Docker Setup

This project includes Docker configuration for easy containerization:

Using yarn:
```sh
# Build the Docker container
yarn docker:build

# Start the containers
yarn docker:up

# Stop the containers
yarn docker:down

# Restart the containers
yarn docker:restart
```

Using npm:
```sh
# Build the Docker container
npm run docker:build

# Start the containers
npm run docker:up

# Stop the containers
npm run docker:down

# Restart the containers
npm run docker:restart
```

## Scripts

Using yarn:
- `yarn dev`: Starts the development server
- `yarn build`: Builds the application for production
- `yarn lint`: Runs ESLint to check for linting errors
- `yarn prettier`: Formats the code using Prettier
- `yarn test`: Runs Jest tests
- `yarn test:watch`: Runs Jest tests in watch mode
- `yarn preview`: Previews the production build locally

Using npm:
- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm run lint`: Runs ESLint to check for linting errors
- `npm run prettier`: Formats the code using Prettier
- `npm run test`: Runs Jest tests
- `npm run test:watch`: Runs Jest tests in watch mode
- `npm run preview`: Previews the production build locally

## Project Structure

The project follows a feature-based architecture:
- `src/components`: Reusable UI components
- `src/features`: State management and business logic
- `src/hooks`: Custom React hooks for data fetching and state
- `src/pages`: Main application pages
- `src/services`: API service integrations
- `src/types`: TypeScript type definitions
- `src/utils`: Utility functions and helpers
