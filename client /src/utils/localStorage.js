// Function to get saved book IDs from local storage
export const getSavedBookIds = () => {
  // Retrieve 'saved_books' from local storage and parse it as JSON
  // If 'saved_books' is not set, default to an empty array
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  // Return the saved book IDs
  return savedBookIds;
};

// Function to save book IDs to local storage
export const saveBookIds = (bookIdArr) => {
  // If the book ID array is not empty, save it to local storage as 'saved_books'
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    // If the book ID array is empty, remove 'saved_books' from local storage
    localStorage.removeItem('saved_books');
  }
};

// Function to remove a book ID from local storage
export const removeBookId = (bookId) => {
  // Retrieve 'saved_books' from local storage and parse it as JSON
  // If 'saved_books' is not set, default to null
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  // If there are no saved book IDs, return false
  if (!savedBookIds) {
    return false;
  }

  // Filter out the book ID to be removed from the saved book IDs
  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  // Save the updated book IDs back to local storage
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  // Return true to indicate success
  return true;
};