import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ParticipantDetails from "./ParticipantDetails";
import Login from "./Login";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';

// HOC to check if the user is authenticated
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isLoggedIn = !!Cookies.get("jwt_token"); // Check if JWT token exists

  // If user is not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  // If user is logged in, render the provided element
  return <Element {...rest} />;
};

function App() {
  return (
      <Router>
        <Routes>
          {/* Use ProtectedRoute for protected routes */}
          <Route path="/" element={<Login />} />
          <Route path="/records/:id" element={<ProtectedRoute element={ParticipantDetails} />} />
        </Routes>
      </Router>
  );
}

export default App;
