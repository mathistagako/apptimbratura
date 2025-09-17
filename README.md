# Timbratura – Employee Work Time Tracking Application

Timbratura is a web-based application for tracking employee work hours through check-in/check-out (timbratura) records. The system is split into a backend API (LaravelTimbratura) and a frontend app (apptimbratura), working together to allow employees to log their attendance and managers to review time records.

> ⚠️ **Work in Progress**: Both parts are currently in active development, and certain features (like secure authentication) are not yet fully implemented.

## Architecture Overview

- **Backend**: Laravel-based RESTful API (`LaravelTimbratura`)
- **Frontend**: React-based single-page application (`apptimbratura`)

---

## Backend (LaravelTimbratura)

### Overview

LaravelTimbratura is a Laravel-based backend project that provides a RESTful API for the time tracking application. It handles data management, business logic, and database interactions for employee records and attendance logs.

> ⚠️ **Security Notice**: Authentication is rudimentary at this stage – passwords are not hashed or encrypted in this early version, which is a known security issue to be addressed.

### Features

- **Employee Records**: Maintains employee data (name, email/ID, and plaintext password for login)
- **Login API**: Provides an endpoint to verify user credentials with simple password matching
- **Clock-In/Clock-Out API**: Endpoints to record work session start and end times
- **Attendance Logs**: Stores complete history of check-in and check-out events
- **Basic Validation**: Input validation for API requests using Laravel's built-in features

### Tech Stack & Dependencies

- **Framework**: Laravel (PHP 8+)
- **Database**: MySQL or MariaDB
- **ORM**: Eloquent
- **Date/Time**: Carbon library (included with Laravel)
- **Security**: ⚠️ Plain text passwords (temporary - will be replaced with Laravel Hash)

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd LaravelTimbratura
   ```

2. **Install dependencies**:
   ```bash
   composer install
   ```

3. **Environment setup**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   
   Configure your `.env` file:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

4. **Run migrations**:
   ```bash
   php artisan migrate
   ```

5. **Seed initial data** (optional):
   ```bash
   php artisan db:seed
   ```

6. **Launch development server**:
   ```bash
   php artisan serve
   ```
   Server will run at `http://localhost:8000`

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/login` | Verify employee credentials |
| `POST` | `/api/clock-in` | Record clock-in timestamp |
| `POST` | `/api/clock-out` | Record clock-out timestamp |
| `GET` | `/api/attendance` | Retrieve attendance records (planned) |

### CORS Configuration

Ensure your `config/cors.php` allows requests from your frontend origin (e.g., `http://localhost:3000` for React development).

### Project Status and Roadmap

**Current Status**: Basic functionality implemented

**Upcoming Features**:
- ✅ Secure password hashing (Laravel Hash/Bcrypt)
- ✅ JWT or session-based authentication
- ✅ User management and registration
- ✅ Data reporting and analytics
- ✅ Enhanced validation and error handling
- ✅ Comprehensive testing suite

---

## Frontend (apptimbratura)

### Overview

The apptimbratura repository contains the frontend application providing a user-friendly interface for employees to log in and record their check-in/check-out times. Built as a single-page application (SPA) using React.

### Features

- **Login Screen**: Simple credential-based authentication
- **Clock-In/Clock-Out Interface**: One-click time logging with instant feedback
- **Status Display**: Real-time confirmation of actions and current status
- **Attendance Log View**: Basic view of recent attendance records (planned)
- **Error Alerts**: User-friendly error messaging for failed operations

### Tech Stack

- **Framework**: React with JavaScript ES6+
- **HTTP Client**: Fetch API or Axios
- **Styling**: HTML5 and CSS3 (basic styling)
- **State Management**: React hooks (useState, useEffect)
- **Build Tool**: Create React App or Vite

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd apptimbratura
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   > Requires Node.js 16+ and npm

3. **Configure API connection**:
   Update the API base URL in your configuration file:
   ```javascript
   // Example: .env or config file
   REACT_APP_API_URL=http://localhost:8000
   ```

4. **Run development server**:
   ```bash
   npm start
   ```
   App will run at `http://localhost:3000`

5. **Build for production**:
   ```bash
   npm run build
   ```

### Usage

1. **Login**: Use test employee credentials (check backend seeder for demo accounts)
2. **Clock In**: Click "Clock In" button to start work session
3. **Clock Out**: Click "Clock Out" button to end work session
4. **View Status**: See real-time confirmation of all actions

### Demo Credentials

If using seeded data:
- Email: `test@example.com`
- Password: `password`

> ⚠️ Remove demo credentials in production

### Project Status and Future Work

**Current Status**: Basic functionality with simple UI

**Planned Improvements**:
- ✅ Secure authentication flow with tokens
- ✅ Enhanced input validation and user feedback
- ✅ Responsive UI/UX design for mobile devices
- ✅ Comprehensive attendance records view
- ✅ Role-based admin dashboard
- ✅ Offline mode support (stretch goal)

---

## Development Notes

### Session Management
Currently, the frontend handles login state in memory only. Page refresh will require re-login until persistent authentication is implemented.

### Error Handling
Check browser console and Laravel logs for debugging. Common issues include:
- CORS errors (backend not allowing frontend origin)
- Network errors (incorrect API URL)
- Authentication failures

### Running Both Applications
Ensure both backend (`php artisan serve`) and frontend (`npm start`) are running simultaneously for full functionality.
