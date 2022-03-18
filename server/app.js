require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = { origin: 'http://localhost:3000' };

// Configure Database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.error(error));

const db = mongoose.connection;

db.once('open', function () {
  console.log('Connected to trippyDB');
});

// Configure EJS template engine and other configs
app.set('view engine', 'ejs');
app.use(cors(corsOptions));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static('public'));

// Routes
const events = require('./routes/events');
const lists = require('./routes/lists');
const posts = require('./routes/posts');
app.use('/events', events);
app.use('/lists', lists);
app.use('/posts', posts);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
