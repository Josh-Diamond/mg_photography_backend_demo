const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const adminRouter = require('../routes/admin-routes');
const profileRouter = require('../routes/profile-routes');
const picturesRouter = require('../routes/pictures-routes');
const securityRouter = require('../routes/security-routes');

server.use(helmet());
server.use(express.json());
server.use(cors());

// Routing
server.use('/api', adminRouter);
server.use('/api/security', securityRouter)
server.use('/api/profile', profileRouter);
server.use('/api/pictures', picturesRouter)

server.get('/', (req, res) => {
  res.send('Welcome to the Jungle 🌴');
});
 
module.exports = server;