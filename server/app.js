const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = { origin: 'http://localhost:3000' };

app.use(cors(corsOptions));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

mongoose
  .connect('', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .catch((error) => console.error(error));

const db = mongoose.connection;

db.once('open', function () {
  console.log('Connected to trippyDB');
});

app.use('/', eventRoute());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
