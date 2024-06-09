
# Authentication Web App with Node.js, Express.js, and MongoDB

This is a simple authentication web application built with Node.js, Express.js, and MongoDB. The application allows users to register, login, and upon successful login, it redirects them to a dashboard page displaying a welcome message with their username.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- HTML/CSS
- Tailwind (optional for styling)

## Features

- User Registration: Users can sign up for an account with a unique username and password.
- User Login: Registered users can log in to their account with their credentials.
- Authentication: Passwords are securely hashed using bcrypt for storage in the database.
- Sessions: User sessions are managed using express-session.
- Dashboard: Upon successful login, users are redirected to a dashboard page displaying a welcome message with their username.

## Setup Instructions

1. **Clone the Repository:**
   ```
   git clone <repository_URL>
   ```

2. **Install Dependencies:**
   ```
   cd authentication-web-app
   npm install
   ```

3. **Set up Environment Variables:**
   - Create a `.env` file in the root directory.
   - Define the following environment variables:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/authentication-web-app
     SESSION_SECRET=your_session_secret
     ```

4. **Start the Server:**
   ```
   npm start
   ```

5. **Access the Application:**
   Open your web browser and go to `http://localhost:3000` to access the application.

## Folder Structure

- `app.js`: Entry point of the application.
- `config`: Contains configuration files, such as database connection and session setup.
- `models`: Defines Mongoose models for MongoDB.
- `routes`: Contains route handlers for different parts of the application.
- `views`: Contains HTML files (ejs templates) for rendering the UI.
- `public`: Contains static assets (CSS, JavaScript, images).

## Usage

- Visit the homepage to register for an account or log in if you already have one.
- After successful login, you will be redirected to the dashboard page displaying a welcome message with your username.

## Credits

This project is created by [Your Name].

## License

This project is licensed under the [MIT License](LICENSE).

---

