import { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, Row} from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

import Auth from '../utils/auth';
const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  const [saveBookMutation, { error }] = useMutation(SAVE_BOOK);  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );
      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const { items } = await response.json();
      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));
      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  }
  const handleSaveBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      console.error('You need to be logged in to save a book!');
      return false;
    }
  
    // Find the book to save
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
  
    try {
      // Perform the save operation (likely a GraphQL mutation)
      const { data } = await saveBookMutation({ 
        variables: { bookData: bookToSave },
        context: {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      });
  
      // Update the state with the saved book
      setSavedBooks([...savedBooks, data.saveBook]);
      saveBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a book"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Find a Book!
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border="dark" className='mb-3'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some(
                          (savedId) => savedId === book.bookId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveBook(book.bookId)}
                      >
                        {savedBookIds?.some((savedId) => savedId === book.bookId)
                          ? 'Book Already Saved!'
                          : 'Save This Book!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
export default SearchBooks;