const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  role: String
});

const User = mongoose.model('User', userSchema);

// Passport Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id });
  if (existingUser) {
    return done(null, existingUser);
  }

  const newUser = new User({
    googleId: profile.id,
    email: profile.emails[0].value,
    role: 'client' // Default role, you might want to set this dynamically
  });

  await newUser.save();
  done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect based on user role.
    const role = req.user.role;
    switch (role) {
      case 'admin':
        res.redirect('http://localhost:4200/admin');
        break;
      case 'chef':
        res.redirect('http://localhost:4200/chef');
        break;
      case 'agent':
        res.redirect('http://localhost:4200/agent');
        break;
      case 'client':
        res.redirect('http://localhost:4200/client');
        break;
      default:
        res.redirect('/');
    }
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
