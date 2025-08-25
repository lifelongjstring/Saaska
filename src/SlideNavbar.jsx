import React, { useState } from 'react';
import './styles.css';

const SlideNavbar = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    };
    localStorage.setItem('registrationData', JSON.stringify(formData));
    window.location.href = 'signup.html'; // or navigate via React Router
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      email: form.email.value,
      password: form.password.value,
    };
    console.log("Login data:", formData);
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <img src="icons8-job-80.png" alt="Job Icon" className="login-logo" />
      </div>

      <div className="main">
        <input
          type="checkbox"
          id="chk"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          aria-hidden="true"
        />

        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">Log in</label>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Log in</button>
          </form>
        </div>

        <div className="signup">
          <form onSubmit={handleRegister}>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input type="text" name="username" placeholder="User name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SlideNavbar;
