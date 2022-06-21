import React, { useState, useEffect, useRef } from 'react';

import { Form, Button, ListGroup } from 'react-bootstrap';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, onValue, update } from "firebase/database";


function App() {

  const [currentUser, setCurrentUser] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoKeys, setTodoKeys] = useState([]);
  const todoRef = useRef();
  const [toEdit, setToEdit] = useState('');
  const [editingTodo, setEditingTodo] = useState('');
  
  function addTodo() {
    const db = getDatabase();
    push(ref(db, 'users/' + currentUser.uid + '/todos'), {
      todo: todoRef.current?.value,
      show: true
    });
  }

  function deleteTodo(todoID) {
    const db = getDatabase();
    update(ref(db, 'users/' + currentUser.uid + '/todos/' + todoID), {
      show: false
    });
  }

  function editTodo() {
    const db = getDatabase();
    update(ref(db, 'users/' + currentUser.uid + '/todos/' + toEdit), {
      todo: editingTodo
    });
    setToEdit('');
  }

  function logout() {
    getAuth().signOut();
  }

  useEffect(() => {
    getAuth().onAuthStateChanged(function (user) {
      if (user) {
        setCurrentUser(user);
        // User is signed in.
      } else {
        // No user is signed in.
        setCurrentUser(false)
      }
    });
  }, [getAuth().currentUser])

  useEffect(() => {
    if (currentUser) {
      const db = getDatabase();
      const theRef = ref(db, 'users/' + currentUser.uid + '/todos');
      onValue(theRef, (snapshot) => {
        const data = snapshot.val();
        let array = []
        let objectKeys = Object.keys(data);
        for (let i = 0; i < objectKeys.length; i++) {
          if (data[objectKeys[i].show]) {
            array.push(data[objectKeys[i]]);
          }
        }
        setTodos(data);
        setTodoKeys(Object.keys(data));

      });
    }
  }, [currentUser])

  function openEdit(todoID)
  {
    setToEdit(todoID);
    setEditingTodo(todos[todoID].todo)
  }

  return (
    
          <div>
            <Button
              onClick={() => logout()}>Logout</Button>
            <Form className="mt-2">

              <Form.Group className="mb-3">
                <Form.Label>Todo</Form.Label>
                <Form.Control type="text" placeholder="Enter todo" ref={todoRef} />
              </Form.Group>
              <Button variant="primary"
                onClick={() => addTodo()}>
                Add todo
              </Button>
            </Form>
            <ListGroup className="mt-4">
              {
                todos ?
                  todoKeys.map((i) => (
                    todos[i].show ?
                      <ListGroup.Item key={i}>
                        {
                          i === toEdit ?
                            <Form>
                              <Form.Group className="mb-3">
                                <Form.Control type="text" value={editingTodo} onChange={(e) => setEditingTodo(e.target.value)} />
                              </Form.Group>
                              <Button variant="primary"
                                onClick={() => editTodo()}>
                                Submit
                              </Button>
                            </Form>
                            :
                            <div>{
                              todos[i].todo}
                              <Button
                              variant="danger"
                              style={{float: "right"}}
                                onClick={() => deleteTodo(i)}>
                                Delete</Button>
                              <Button
                              style={{float: "right"}}
                                onClick={() => openEdit(i)}>
                                Edit</Button>
                            </div>
                        }
                      </ListGroup.Item>
                      :
                      ""
                  ))
                  :
                  ""
              }
            </ListGroup>
          </div>
  );
}

export default App;
