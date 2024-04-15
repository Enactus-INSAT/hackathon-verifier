import { useState } from "react";
import Cookies from "js-cookie";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    const handleSubmit = (event) => {
        event.preventDefault();
        // Simulate authentication logic
        if (username === "enactusxembs" && password === "hackathon2024") {
            // Generate a JWT token (replace with your actual JWT generation logic)
            const token = "your_generated_jwt_token_here";

            // Store the token in a cookie with an expiry of 1 day
            Cookies.set("jwt_token", token, { expires: 1 });

            // Call the onLogin function passed as a prop

            // Update login status
            setIsLoggedIn(true);
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            {isLoggedIn ? ( // Render message if logged in
                                <div className="alert alert-success">
                                    You are logged in!
                                </div>
                            ) : (
                                <>
                                    <h2 className="card-title text-center mb-4">Login</h2>
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Username:</label>
                                            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Password:</label>
                                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
