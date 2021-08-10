import React, { useState } from 'react'
import SideBar from './SideBar';
import Board from './Board';
import './App.css';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function App() {
  const [number, setNumber] = useState(1)
  const [screen, setScreen] = useState('part')
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const openMessage = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="App">
      <SideBar
      number={number}
      setNumber={setNumber}
      screen={screen}
      setScreen={setScreen}
      setMessage={setMessage}
      setMessageType={setMessageType}
      openMessage={openMessage}/>
      <Board
      number={number}
      setNumber={setNumber}
      screen={screen}
      setScreen={setScreen}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={messageType}>
            {message}
            </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
