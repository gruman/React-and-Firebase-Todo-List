import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Container } from 'react-bootstrap';
import { getAuth } from "firebase/auth";

import Login from './components/Login';
import TodoList from './components/TodoList';

import './firebase';

function App() {

  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    getAuth().onAuthStateChanged(function (user) {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(false)
      }
    });
  }, [getAuth().currentUser])

  return (
    <Container style={{ maxWidth: 800 }}>
      <h1>React Firebase Todo List Tutorial</h1>
      {
        currentUser ?
          <TodoList />
          :
          <Login />
      }
    </Container>
  );
}

export default App;
