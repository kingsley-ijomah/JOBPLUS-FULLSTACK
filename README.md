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

## Installation

### Clone the repository
```bash
git clone https://github.com/kingsley-ijomah/JOBPLUS-FULLSTACK.git

# Navigate to the project directory
cd JOBPLUS-FULLSTACK
```

### Frontend
```bash
# Navigate to the backend directory
cd jobplus-backend

# Install dependencies using Yarn
yarn install

# Start the backend server
yarn dev
```

### Backend
```bash
# Navigate to the frontend directory
cd jobplus-frontend

# Install dependencies using Yarn
yarn install

# Start the backend server
yarn dev

```

## TODO:

### Apply Page
- Ability to open apply page with content
- Ability to toggle Apply status ( Apply / Withdraw )

### Main Nav
- Show notification icon if notification exists
- Count Saved Jobs for a user

### Home Page
- Job Search
- Click on Sector
- Click on Categories

### Job Listings/Applications
- Fetch browse by sector data
- Fetch browser by location data
- Ability to click browse by sector list
- Ability to click browse by location list
- Ability to save / unsave jobs

### Cookie
- Persist T&C cookie