// Import the main CSS file
import './App.css';
// Import the Outlet component from react-router-dom for rendering route components
import { Outlet } from 'react-router-dom';
// Import the necessary components from @apollo/client for creating an Apollo client
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
// Import the setContext function from @apollo/client/link/context for setting the context of Apollo links
import { setContext } from '@apollo/client/link/context';

// Import the Navbar component
import Navbar from './components/Navbar';

// Create an HTTP link for the Apollo client with the /graphql URI
const httpLinkForGraphql = createHttpLink({
    uri: '/graphql',
});

// Create an authentication link for the Apollo client that adds the authorization header to requests
const authLinkForApollo = setContext((_, { headers }) => {
    // Get the token from local storage
    const token = localStorage.getItem('id_token');
    // Return the headers with the authorization header added
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

// Create an Apollo client with the authentication link, the HTTP link, and an in-memory cache
const apolloClient = new ApolloClient({
    link: authLinkForApollo.concat(httpLinkForGraphql),
    cache: new InMemoryCache(),
});

// Define the main App component
function App() {
    return (
        // Provide the Apollo client to the component tree
        <ApolloProvider client={apolloClient}>
            {/* // Render the Navbar component */}
            <Navbar />
            {/* // Render the component for the current route */}
            <Outlet />
        </ApolloProvider>
    );
}

// Export the App component
export default App;