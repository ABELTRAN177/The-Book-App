import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'


// Create a browser router with routes for the App, SearchBooks, and SavedBooks components
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <h1 className="display-2"> Incorrect Page</h1>,
        children: [
            {
                index: true,
                element: <SearchBooks />
            }, {
                path: '/saved',
                element: <SavedBooks />
            }
        ]
    }
])

// Render the router in the root element of the document
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)