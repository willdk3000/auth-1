import React, { useState, useEffect } from 'react';
import { getUser, logout, login } from '../API.js'

const Auth = () => {

  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getUser()
      .then(res => res.json())
      .then(setUser)
  }, [user.method]);

  async function handleLogout(e) {
    setIsLoading(true);
    const response = await logout();
    setUser(response);
    setIsLoading(false);
  }

  async function handleLogin(e) {
    setIsLoading(true);
    const response = await login();
    getUser().then(res => res.json())
      .then(user => setUser(user));
    setIsLoading(false);
  }

  return (
    user.method ? (
      <div className="container">
        <h1>Hi {user.email} !</h1>
        <button className="info" onClick={(e) => handleLogout(e)}>Logout</button>
      </div >
    )
      : user.method === undefined && isLoading === false ? (
        <div className="container">
          <br />
          <button className="info" onClick={(e) => handleLogin(e)}>Sign in with Google</button>
          <br />
        </div >
      ) : (
          <div className="container">
            Loading...
        </div>
        )
  )
}

export default Auth;
