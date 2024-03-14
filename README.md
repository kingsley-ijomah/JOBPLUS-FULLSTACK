# JOBPLUS Full-Stack Application

## Introduction
JOBPLUS is a comprehensive full-stack web application designed to streamline the job search and recruitment process. This platform connects job seekers with potential employers, providing an efficient and user-friendly interface for browsing job listings, submitting applications, and managing recruitment processes.

## Technologies Used
### Frontend
- **React**: A JavaScript library for building user interfaces.
- **React Router**: For routing in React applications.
- **Axios**: A promise-based HTTP client for making HTTP requests.
- **JS-Cookie**: A simple, lightweight JavaScript API for handling cookies.
- **JWT-Decode**: A library to decode JWTs (JSON Web Tokens).
- **Sass**: A preprocessor scripting language that is interpreted or compiled into CSS.
- **Vite**: A modern frontend build tool.

### Backend
- **Strapi**: An open-source headless CMS (Content Management System).
- **SQLite**: (through `better-sqlite3`), high-reliability SQL database engine.
- **Strapi Plugins**:
  - **i18n**: Internationalization plugin for Strapi.
  - **Users-Permissions**: Plugin for managing users and permissions.
  - **Email-SendGrid**: Plugin for integrating SendGrid email services with Strapi.

## Visuals
### Admin
![JOBPLUS Admin Interface](./assets/jobplus-admin1.gif)
![JOBPLUS Admin Interface](./assets/jobplus-admin2.gif)
### Frontend
![JOBPLUS Admin Interface](./assets/jobplus-frontend1.gif)
![JOBPLUS Admin Interface](./assets/jobplus-frontend1.gif)

## External Requirements
```bash
# This app sends emails so require email provider
# setup a free sendgrid account and obtain sendgrid API_KEY
# Make a note of api key for use in instruction below
visit: https://sendgrid.com/
```

## Installation

### Clone the repository
```bash
git clone https://github.com/kingsley-ijomah/JOBPLUS-FULLSTACK.git

# Navigate to the project directory
cd JOBPLUS-FULLSTACK
```

### Backend
```bash
# Navigate to the backend directory
cd jobplus-backend

# Install dependencies using Yarn
yarn install

# Rename .env.sample to .env
cp .env.sample .env

# Run script to generate .env secrets
# Copy printed values and save in .env file
node generateSecrets.js

# Make sure to paste sendgrid api key into .env
SENDGRID_API_KEY=<PASTE API KEY>

# Start the backend server
yarn dev

```

### Frontend
```bash
# Navigate to the frontend directory
cd jobplus-frontend

# Install dependencies using Yarn
yarn install

# Make copy of .env.sample to .env
cp .env.sample .env

# Start the backend server
yarn dev

```