// Import necessary components and functions
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';

import Auth from '../utils/auth';

// Define the SavedBooks component
const SavedBooks = () => {
    // Execute the QUERY_ME query and get the loading state and data
    const { loading, data: queryData } = useQuery(QUERY_ME);
    // Define the removeBook mutation
    const [removeBookMutation] = useMutation(REMOVE_BOOK);

    // Get the user data from the query data (default to an empty object if data is undefined)
    const userData = queryData?.me || {};

    // Define the function to handle deleting a book
    const handleDeleteBook = async (bookId) => {
        // Get the token if the user is logged in
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        // If there's no token, return false
        if (!token) {
            return false;
        }

        try {
            // Execute the removeBook mutation with the bookId as a variable
            const { data: mutationData } = await removeBookMutation({
                variables: { bookId }
            });

            // Remove the book ID from local storage
            removeBookId(bookId);
        } catch (err) {
            // Log any errors
            console.error(err);
        }
    };

    // If the query is loading, display a loading message
    if (loading) {
        return <h2>Loading...</h2>;
    }

    // Render the component
    return (
     <>
     <div fluid className="text-light bg-dark p-5">
            <Container>
                <h2>Viewing {userData.username}'s books!</h2>
            </Container>
        </div>
        <container>
            <h2 className='pt-5'>
                {userData.savedBooks.length
                    ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
                    : 'You have no saved books!'}
            </h2>
            <div>
                <row>
                    {userData.savedBooks.map((book) => {
                        return (
                            <Col md="4">
                                <Card key={book.bookId} border="dark">
                                    {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                                    <Card.Body>
                                        <Card.Title>{book.title}</Card.Title>
                                        <p className='small'>Authors: {book.authors}</p>
                                        <Card.Text>{book.description}</Card.Text>
                                        <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>Delete this Book!</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </row>
            </div>
        </container>
     </>
    );
};

export default SavedBooks;