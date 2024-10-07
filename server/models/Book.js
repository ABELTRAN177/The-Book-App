// Import the Schema constructor from the mongoose package
const { Schema: SchemaConstructor } = require('mongoose');

// Define a new Schema for books
const bookDetailsSchema = new SchemaConstructor({
    // An array of authors, each of which is a string
    authors: [
        {
            type: String,
        },
    ],
    // A description of the book, which is a required string
    description: {
        type: String,
        required: true,
    },
    // A unique ID for the book, which is a required string
    bookId: {
        type: String,
        required: true,
        unique: true,
    },
    // An image of the book, which is a string
    image: {
        type: String,
    },
    // A link to more information about the book, which is a string
    link: {
        type: String,
    },
    // The title of the book, which is a required string
    title: {
        type: String,
        required: true,
    },
});

// Export the book schema
module.exports = bookDetailsSchema;