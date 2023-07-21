const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Enable All CORS Requests
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB...')
  })
  .catch(err => console.error('Could not connect to MongoDB...', err));


// Use middleware
app.use(express.json());

// Use routes
app.use('/user', userRoutes);
app.use('/book', bookRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

const port = process.env.PORT || 8085;
app.listen(port, () => console.log(`Server listening on port ${port}`));
