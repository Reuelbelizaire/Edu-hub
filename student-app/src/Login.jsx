import React, { useState } from "react";
import './Login.css';

export const Login = () => {
    // state variables to track the email and password input by the user
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // switches from "sign In to sign up" and vice versa
    const [isLogin,setIsLogin] = useState(true);

    //submit button
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // make sure react gtathers email n password
        console.log("form gathered", { email, password, isLogin });

        // connect to supabase and send the email and password to the database
    };

    return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isLogin ? 'Welcome to Edu-Sync' : 'Create your Studio Account'}</h2>
        <p>{isLogin ? 'Sign in to access your saved courses.' : 'Sign up to start building your study lab.'}</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="toggle-container">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Create one here.' : 'Sign in here.'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;