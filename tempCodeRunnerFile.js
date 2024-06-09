const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/auth');
const User = require('./models/User'); // Ensure you have a User model

const app = express();

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

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/views/register.html');
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body; // Add email field
    const newUser = new User({ username, email, password }); // Include email field
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // Change to use email instead of username
    const user = await User.findOne({ email }); // Find user by email
    if (!user || !(await user.comparePassword(password))) { // Check if user exists and password matches
      console.warn('Invalid credentials for email:', email);
      return res.status(401).send('Invalid credentials');
    }
    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.sendFile(__dirname + '/views/dashboard.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
