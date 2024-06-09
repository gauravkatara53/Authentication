const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path'); // Import path module

const authRoutes = require('./routes/auth');

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
// Set the directory where your views are located
app.set('views', path.join(__dirname, 'views'));

// Enable Mongoose debugging
mongoose.set('debug', true);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/register', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/register' })
}));

// Routes
app.use('/auth', authRoutes);

// Dashboard route
app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('dashboard', { user: req.session.user });
});

// Login and Register routes
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
