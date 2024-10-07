// Import the decode function from 'jwt-decode' for decoding JWTs
import decode from 'jwt-decode';

// Define the AuthService class
class AuthService {
  // Method to get the profile information from the token
  getProfile() {
    // Decode the token and return the result
    return decode(this.getToken());
  }

  // Method to check if the user is logged in
  loggedIn() {
    // Get the token
    const token = this.getToken();
    // Return true if the token exists and is not expired
    return !!token && !this.isTokenExpired(token);
  }

  // Method to check if a token is expired
  isTokenExpired(token) {
    try {
      // Decode the token
      const decodedToken = decode(token);
      // If the expiration time of the token is less than the current time, return true
      if (decodedToken.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      // If an error occurs, return false
      return false;
    }
  }

  // Method to get the token from local storage
  getToken() {
    // Return the 'id_token' item from local storage
    return localStorage.getItem('id_token');
  }

  // Method to log in the user
  login(idToken) {
    // Set the 'id_token' item in local storage to the provided ID token
    localStorage.setItem('id_token', idToken);
    // Redirect the user to the home page
    window.location.assign('/');
  }

  // Method to log out the user
  logout() {
    // Remove the 'id_token' item from local storage
    localStorage.removeItem('id_token');
    // Redirect the user to the home page
    window.location.assign('/');
  }
}

// Export a new instance of the AuthService class
export default new AuthService();