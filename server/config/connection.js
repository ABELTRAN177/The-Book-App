// Import the mongoose package to interact with MongoDB
const mongoosePackage = require('mongoose');

// Connect to the MongoDB database, using the URI from the environment variables if available, or a local MongoDB instance if not
mongoosePackage.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

// Export the connection to the MongoDB database
module.exports = mongoosePackage.connection;