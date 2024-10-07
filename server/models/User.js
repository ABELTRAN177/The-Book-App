// Import the Schema and model functions from the mongoose package
const { Schema: MongooseSchema, model: MongooseModel } = require('mongoose');
// Import the bcrypt package for password hashing
const passwordHasher = require('bcrypt');

// Import the Book schema
const BookModelSchema = require('./Book');

// Define a new Schema for users
const UserAccountSchema = new MongooseSchema({
    // The username, which is a required and unique string
    username: {
        type: String,
        required: true,
        unique: true,
    },
    // The email, which is a required and unique string that must match an email address pattern
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    // The password, which is a required string
    password: {
        type: String,
        required: true,
    },
    // An array of saved books, each of which follows the Book schema
    savedBooks: [BookModelSchema],
    },
    {
        // When converting to JSON, include virtuals
        toJSON: {
            virtuals: true,
        },
    }
);

// Before saving a user, hash their password if it's new or modified
UserAccountSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await passwordHasher.hash(this.password, saltRounds);
    }

    next();
});

// Add a method to the User schema to check if a password is correct
UserAccountSchema.methods.isCorrectPassword = async function (password) {
    return passwordHasher.compare(password, this.password);
};

// Export the User model
module.exports = MongooseModel('User', UserAccountSchema);