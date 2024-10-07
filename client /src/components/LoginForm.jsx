import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const LoginForm = () => {
    // State to manage user form data
    const [formData, setUserFormData] = useState({ email: '', password: '' });
    // State to manage form validation
    const [validated] = useState(false);
    // State to manage alert visibility
    const [showAlert, setShowAlert] = useState(false);
    // Apollo mutation for logging in a user
    const [addUser, { error }] = useMutation(LOGIN_USER);
    // Effect to show alert when there is an error
    useEffect(() => {
        if (error) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [error]);

    // Function to handle input changes
const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the form data state
    setUserFormData({ ...formData, [name]: value });
  };
  
  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  
    try {
      // Attempt to add user with form data
      const { data } = await addUser({
        variables: { ...formData },
      });
  
      // Log user in with received token
      Auth.login(data.addUser.token);
    } catch (err) {
      // Log any errors
      console.error(err);
    }
  
    // Reset the form data
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

// Render the form
return (
    <>
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Error occured with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
                type='text'
                placeholder='Your email'
                name='email'
                onChange={handleInputChange}
                value={formData.email}
                required
            />
            <Form.Control.Feedback type='invalid'>Email required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'>Password:</Form.Label>
            <Form.Control
                type='password'
                placeholder='Your password'
                name='password'
                onChange={handleInputChange}
                value={formData.password}
                required
            />
            <Form.Control.Feedback type='invalid'>Password required!</Form.Control.Feedback>
                </Form.Group>
                <Button
                    disabled={!(formData.email && formData.password)}
                    type='submit'
                    variant='success'
                >
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default LoginForm;