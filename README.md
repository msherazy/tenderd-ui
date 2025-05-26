# Tenderd Fleet Management Dashboard

Cashew Client is a web application built with React + TypeScript + Vite, designed to provide a seamless user experience for managing personal information and documents. The application is hosted on DigitalOcean and the source code is available on GitHub.

## Repository

The source code for this project is available on GitHub. You can find it [here](https://github.com/msherazy/cashew-client.git).

## Features

- User authentication and registration
- Upload and display of Emirates ID front and back images
- OCR for extracting text from images [Emirates IDs]
- Emirates IDs validation based on a custom score implementation
- Review personal information before submission
- Success page to confirm successful submission
- Error handling and notifications
- User existence check before registration based on Phone Number and email
- Responsive design for various screen sizes

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript
- **Vite**: A build tool that provides a faster and leaner development experience for modern web projects
- **Yarn**: A package manager that doubles down as a project manager
- **DigitalOcean**: Cloud infrastructure provider for hosting the application [Free tier]

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/msherazy/cashew-client.git
   cd cashew-client
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```
3. Create a `.env` file in the root directory and add the following environment variables:

   ```dotenv
   VITE_API_URL=http://localhost:3000/api/v1
   ```

4. Start the development server:

   ```sh
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

## Scripts

- `yarn dev`: Starts the development server
- `yarn build`: Builds the application for production
- `yarn lint`: Runs ESLint to check for linting errors
- `yarn format`: Formats the code using Prettier
