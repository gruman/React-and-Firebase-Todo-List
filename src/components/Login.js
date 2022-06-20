// /components/Login.js

import React, { useState, useRef } from 'react';

import { Form, Button, Alert } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function App() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const email = useRef();
  const password = useRef();
  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');

  async function login() {
    setRegisterError('');
    setLoginError('');
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.current?.value, password.current?.value)
      .then((userCredential) => {
        // Signed in
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoginError(errorMessage);
      });
  }
  async function registerUser() {
    setRegisterError('');
    setLoginError('');
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailRef.current?.value, passwordRef.current?.value)
      .then((userCredential) => {
        // Signed in 
      })
      .catch((error) => {
        const errorMessage = error.message;
        setRegisterError(errorMessage);
      });
  }


  return (
    <div>
      <h2>Register</h2>
      {
        registerError ?
          <Alert>{registerError}</Alert>
          :
          ""
      }
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={passwordRef} />
        </Form.Group>
        <Button variant="primary"
          onClick={() => registerUser()}>
          Submit
        </Button>
      </Form>

      <h2 className="mt-4">Login</h2>
      {
        loginError ?
          <Alert>{loginError}</Alert>
          :
          ""
      }
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={email} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={password} />
        </Form.Group>
        <Button variant="primary"
          onClick={() => login()}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
