require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = { origin: 'http://localhost:3000' };

// Database
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

// Configurations
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
const users = require('./routes/users');
const events = require('./routes/events');
const lists = require('./routes/lists');

app.use('/users', users);
app.use('/events', events);
app.use('/lists', lists);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
